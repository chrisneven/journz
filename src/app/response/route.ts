import { prisma } from "@/lib/db";
import { safeAsync } from "@/lib/safeAsync";
import { createDateNumber, verifyToken } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";

const shema = z.object({
    answer: z.enum(["yes", "no"]),
    token: z.string(),
    date: z.string().transform((date) => new Date(date)),
});

const tokenSchema = z.object({
    userId: z.string(),
    iat: z.number(),
    exp: z.number(),
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const result = shema.safeParse(Object.fromEntries(searchParams));
    if (!result.success) {
        return Response.json({ error: result.error }, { status: 400 });
    }

    const { answer, token, date } = result.data;
    const { userId } = tokenSchema.parse(verifyToken(token));

    const dateNumber = createDateNumber(date);
    const attended = answer === "yes";
    const responseMutation = await safeAsync(
        prisma.response.upsert({
            where: { dateNumber_userId: { userId, dateNumber } },
            update: { attended },
            create: { userId, dateNumber, attended, date },
        })
    );

    if (!responseMutation.success) {
        return Response.json(
            { error: responseMutation.error },
            { status: 500 }
        );
    }

    redirect(`/response/${userId}/${answer}`);
}
