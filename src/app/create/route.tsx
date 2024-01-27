import { prisma } from "@/lib/db";
import { generateToken } from "@/lib/utils";
import { Resend } from "resend";
import { z } from "zod";
import JournzResponse from "../../../emails/response";

const resend = new Resend(process.env.RESEND_API_KEY);

const shema = z.object({
    secret: z.string(),
});

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url);
    const result = shema.safeParse(Object.fromEntries(searchParams));
    if (!result.success) {
        return Response.json({ error: result.error }, { status: 400 });
    }

    const { secret } = result.data;

    if (secret !== process.env.JWT_SECRET) {
        return Response.json({ error: "Invalid secret" }, { status: 400 });
    }

    const users = await prisma.user.findMany();
    if (!users.length) {
        return Response.json({ error: "No users found" }, { status: 400 });
    }
    const date = new Date();
    const dateString = date.toISOString();

    const res = await resend.batch.send(
        users.map((user) => {
            const token = generateToken(user.id);
            const yesUrl = `${process.env.VERCEL_URL}/response/?answer=yes&token=${token}&date=${dateString}`;
            const noUrl = `${process.env.VERCEL_URL}/response/?answer=no&token=${token}&date=${dateString}`;
            return {
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Journz - Are you going to be at the office today?",
                react: (
                    <JournzResponse
                        yesUrl={yesUrl}
                        noUrl={noUrl}
                        userFirstname="Chris"
                    />
                ),
            };
        })
    );
    if (res.error) {
        return Response.json({ error: res.error }, { status: 400 });
    }
    return Response.json({ success: true });
}
