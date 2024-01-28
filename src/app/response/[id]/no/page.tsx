import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function NoPage({ params }: { params: { id: string } }) {
    const user = await prisma.user.findUnique({
        where: {
            id: params.id,
        },
    });

    if (!user) {
        redirect("/");
    }

    return (
        <div className="max-w-md mx-auto text-center p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold text-blue-500 mb-4">
                🙌 Response Recorded, Christiaan!
            </h1>
            <p className="text-gray-700 mb-3">
                {`We understand that you won't be at the office today. Here's how
                you can stay connected and productive:`}
            </p>
            <ul className="text-left mb-4">
                <li className="mb-2">
                    🌐 Access remote work tools and resources available online.
                </li>
                <li className="mb-2">
                    💻 Join virtual meetings to stay in sync with your team.
                </li>
                <li>
                    📞 Feel free to reach out if you need assistance or support.
                </li>
            </ul>
            <p className="font-semibold text-gray-800">
                Have a productive day! 🌟
            </p>
        </div>
    );
}
