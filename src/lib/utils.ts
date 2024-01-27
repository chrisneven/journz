import { clsx, type ClassValue } from "clsx";
import jwt from "jsonwebtoken";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function generateToken(userId: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");
    return jwt.sign({ userId }, secret, { expiresIn: "7 days" });
}

export function verifyToken(token: string) {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");
    return jwt.verify(token, secret);
}

export function createDateNumber(date: Date) {
    return Number(date.toISOString().split("T")[0].split("-").join(""));
}
