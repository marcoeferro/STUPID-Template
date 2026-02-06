import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "$lib/server/auth";
import { createSession, deleteSession } from "$lib/server/session";
import { z } from "zod";
import type { Actions, PageServerLoad } from "./$types";

const LoginSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
});

export const load: PageServerLoad = async ({ locals }) => {
    // Si ya está logueado, mandarlo al hero
    if (locals.user) throw redirect(302, "/hero");
    return {};
};

export const actions: Actions = {
    login: async ({ request, cookies }) => {
        const formData = Object.fromEntries(await request.formData());
        const result = LoginSchema.safeParse(formData);

        if (!result.success) return fail(400, { message: "Datos inválidos" });

        const [user] = await db
            .select()
            .from(userTable)
            .where(eq(userTable.username, result.data.username));

        if (!user || !verifyPassword(result.data.password, user.passwordHash)) {
            return fail(400, { message: "Credenciales incorrectas" });
        }

        await createSession(user.id, cookies);
        throw redirect(302, "/hero");
    },
    logout: async ({ cookies }) => {
        await deleteSession(cookies);
        throw redirect(302, "/login");
    }
};