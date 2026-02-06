import { SESSION_COOKIE_NAME } from "$lib/server/session";
import { db } from "$lib/server/db";
import { sessionTable, userTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    const sessionId = event.cookies.get(SESSION_COOKIE_NAME);

    if (!sessionId) {
        event.locals.user = null;
        return resolve(event);
    }

    const [sessionData] = await db
        .select({ user: userTable, session: sessionTable })
        .from(sessionTable)
        .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
        .where(eq(sessionTable.id, sessionId));

    if (!sessionData || sessionData.session.expiresAt < new Date()) {
        event.cookies.delete(SESSION_COOKIE_NAME, { path: "/" });
        event.locals.user = null;
    } else {
        // Ahora TS reconocerá esto gracias a app.d.ts
        event.locals.user = {
            id: sessionData.user.id,
            username: sessionData.user.username
        };
    }

    return resolve(event);
};