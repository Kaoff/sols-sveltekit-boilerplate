import prisma from "$lib/prisma";
import type { User } from "@prisma/client";
import { fail, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ locals, params }) => {
	if (locals.user === null || locals.session === null) {
		throw fail(403, { message: "Unauthorized" });
	}

	const uuid = params.userUuid;

	const user = await prisma.user.findUnique({
		where: {
			uuid,
		},
	});

	if (user === null) {
		throw fail(404, { message: "User not found" });
	}

	return json(user);
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (locals.user === null || locals.session === null) {
		throw fail(403, { message: "Unauthorized" });
	}

	const uuid = params.userUuid;

	const user = await prisma.user.delete({
		where: {
			uuid,
		},
	});

	return json(user);
};

export const PUT: RequestHandler = async ({ locals, params, request }) => {
	if (locals.user === null || locals.session === null) {
		throw fail(403, { message: "Unauthorized" });
	}

	const uuid = params.userUuid;

	const { username, password, email } = (await request.json()) as User;

	const passwordHash = await Bun.password.hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		algorithm: "argon2id",
	});

	const user = await prisma.user.update({
		where: {
			uuid,
		},
		data: {
			username,
			password: passwordHash,
			email,
		},
	});

	return json(user);
};

export const PATCH: RequestHandler = async ({ locals, params, request }) => {
	if (locals.user === null || locals.session === null) {
		throw fail(403, { message: "Unauthorized" });
	}

	const uuid = params.userUuid;

	const { username, password, email } = (await request.json()) as Partial<User>;

	const passwordHash = password
		? await Bun.password.hash(password, {
				memoryCost: 19456,
				timeCost: 2,
				algorithm: "argon2id",
			})
		: undefined;

	const user = await prisma.user.update({
		where: {
			uuid,
		},
		data: {
			username,
			password: passwordHash,
			email,
		},
	});

	return json(user);
};