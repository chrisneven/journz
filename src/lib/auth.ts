import { Lucia } from "lucia";
import { authAdapter } from "./db";

export const lucia = new Lucia(authAdapter, {
    getUserAttributes: (attributes) => {
        return {
            emailVerified: attributes.email_verified,
            email: attributes.email,
        };
    },
    sessionCookie: {
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === "production",
        },
    },
});

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

interface DatabaseUserAttributes {
    email: string;
    email_verified: boolean;
}
