import { prisma } from "@/lib/db";

export async function GET(request: Request) {
    if (
        request.headers.get("Authorization") !==
        `Bearer ${process.env.CRON_SECRET}`
    ) {
        return Response.json({ error: "Invalid secret" }, { status: 401 });
    }

    // wake up the database
    await prisma.user.findFirst();

    return Response.json({ success: new Date().toISOString() });
}
