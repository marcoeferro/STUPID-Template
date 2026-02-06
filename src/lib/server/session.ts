import { db } from "./db";
import { sessionTable } from "./db/schema";
import { eq } from "drizzle-orm";
import { randomBytes } from "node:crypto";
import type { Cookies } from "@sveltejs/kit";

export const SESSION_COOKIE_NAME = "auth_session";

export async function createSession(userId: string, cookies: Cookies) {
    const sessionId = randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 días

    await db.insert(sessionTable).values({
        id: sessionId,
        userId,
        expiresAt
    });

    cookies.set(SESSION_COOKIE_NAME, sessionId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt
    });
}

export async function deleteSession(cookies: Cookies) {
    const sessionId = cookies.get(SESSION_COOKIE_NAME);
    if (sessionId) {
        await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
        cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
    }
}