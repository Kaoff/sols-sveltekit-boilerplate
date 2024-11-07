import prisma from "$lib/prisma";
import { fail, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ locals, request }) => {
	if (locals.user === null || locals.session === null) {
		throw fail(403, { message: "Unauthorized" });
	}

	const { username, password, email } = await request.json();

	const passwordHash = await Bun.password.hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		algorithm: "argon2id",
	});

	try {
		const user = await prisma.user.create({
			data: {
				username,
				password: passwordHash,
				email,
			},
		});

		return json(user);
	} catch (e) {
		return new Response(null, { status: 500 });
	}
};