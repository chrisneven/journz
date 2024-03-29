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

    // We want an overview of the previous month
    const currentDate = new Date();
    const previousMonth = addMonths(currentDate, -1);
    const monthStart = createDateNumber(startOfMonth(previousMonth));
    const monthEnd = createDateNumber(endOfMonth(previousMonth));

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

    const month = previousMonth.toLocaleString("default", {
        month: "long",
    });
    const year = previousMonth.getFullYear().toString();

    const res = await resend.batch.send(
        users.map((user) => {
            const yesAmount = user.responses.filter(
                (response) => response.attended
            ).length;
            // e.g. 10 times * 10 km * 0.19 = 19 euro
            const travelReimbursement = (
                yesAmount *
                user.travelDistance *
                (user.travelAllowance / 100)
            ).toFixed(2);

            return {
                from: "Journz <onboarding@resend.dev>",
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
