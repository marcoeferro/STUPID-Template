import { fail, redirect } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { userTable } from "$lib/server/db/schema";
import { hashPassword } from "$lib/server/auth";
import { createSession } from "$lib/server/session";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import type { Actions } from "./$types";

const RegisterSchema = z.object({
    username: z.string().min(3, "Mínimo 3 caracteres").max(31),
    password: z.string().min(6, "Mínimo 6 caracteres")
});

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = Object.fromEntries(await request.formData());
        const result = RegisterSchema.safeParse(formData);

        if (!result.success) {
            return fail(400, { errors: result.error.flatten().fieldErrors });
        }

        const userId = randomUUID();
        const passwordHash = hashPassword(result.data.password);

        try {
            await db.insert(userTable).values({
                id: userId,
                username: result.data.username,
                passwordHash
            });
        } catch (e) {
            return fail(400, { message: "El usuario ya existe" });
        }

        await createSession(userId, cookies);
        throw redirect(302, "/hero");
    }
};