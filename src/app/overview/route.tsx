import { prisma } from "@/lib/db";
import { createDateNumber } from "@/lib/utils";
import JournzOverview from "@emails/overview";
import { addMonths, endOfMonth, startOfMonth } from "date-fns";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const shema = z.object({
    secret: z.string(),
});

export async function GET(request: Request) {
    if (
        request.headers.get("Authorization") !==
        `Bearer ${process.env.CRON_SECRET}`
    ) {
        return Response.json({ error: "Invalid secret" }, { status: 401 });
    }

    const monthStart = createDateNumber(startOfMonth(new Date()));
    const monthEnd = createDateNumber(endOfMonth(new Date()));

    const users = await prisma.user.findMany({
        include: {
            responses: {
                where: {
                    dateNumber: {
                        gte: monthStart,
                        lte: monthEnd,
                    },
                },
            },
        },
    });
    if (!users.length) {
        return Response.json({ error: "No users found" }, { status: 400 });
    }
    const currentDate = new Date();
    const previousMonth = addMonths(currentDate, -1);

    // We want an overview of the previous month

    const month = previousMonth.toLocaleString("default", {
        month: "long",
    });
    const year = previousMonth.getFullYear().toString();

    const res = await resend.batch.send(
        users.map((user) => {
            const yesAmount = user.responses.filter(
                (response) => response.attended
            ).length;
            const travelReimbursement = (yesAmount * 0.23).toFixed(2);

            return {
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: `Journz - Your overview of ${month} in ${year}`,
                react: (
                    <JournzOverview
                        firstName={user.name ?? ""}
                        month={month}
                        year={year}
                        noAmount={user.responses
                            .filter((response) => !response.attended)
                            .length.toString()}
                        yesAmount={yesAmount.toString()}
                        totalAmount={user.responses.length.toString()}
                        travelReimbursement={travelReimbursement}
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
