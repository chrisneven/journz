import { prisma } from "@/lib/db";
import { createDateNumber } from "@/lib/utils";
import { addMonths, endOfMonth, startOfMonth } from "date-fns";
import { redirect } from "next/navigation";

export default async function YesPage({ params }: { params: { id: string } }) {
    const currentDate = new Date();
    const previousMonth = addMonths(currentDate, -1);
    const monthStart = createDateNumber(startOfMonth(previousMonth));
    const monthEnd = createDateNumber(endOfMonth(previousMonth));

    const user = await prisma.user.findUnique({
        where: {
            id: params.id,
        },
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

    if (!user) {
        redirect("/");
    }

    return (
        <div className="max-w-md mx-auto text-center p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-green-500 mb-4">
                🎉 Thank You for Confirming, {user.name}
            </h1>
            <p className="text-gray-700 mb-3">
                Your presence at the office today is noted and much appreciated.
                Here’s a quick look at what to expect:
            </p>
            <ul className="text-left mb-4">
                <li className="mb-2">
                    🌟 A dynamic work environment filled with collaboration and
                    creativity.
                </li>
                <li className="mb-2">
                    ☕ Fresh coffee and snacks to keep your energy up.
                </li>
                <li>📈 Opportunities to connect and grow with your team.</li>
            </ul>
            <p className="font-semibold text-gray-800">See you soon! 🚀</p>

            {/* add content that says how many times ive been at the office already */}

            <p className="text-gray-700 mt-4">
                P.S. You’ve been at the office {user.responses.length} times
                this month.
            </p>
        </div>
    );
}
