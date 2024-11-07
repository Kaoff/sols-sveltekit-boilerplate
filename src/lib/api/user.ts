import prisma from "$lib/prisma";
import type { User } from "@prisma/client";

export const hashPassword = async (password: string): Promise<string> => {
	const passwordHash = await Bun.password.hash(password, {
		memoryCost: 19456,
		timeCost: 2,
		algorithm: "argon2id",
	});
	return passwordHash;
};

export const createUser = async (
	email: string,
	username: string,
	password: string,
): Promise<User> => {
	const passwordHash = await hashPassword(password);
	const user = await prisma.user.create({
		data: {
			email,
			username,
			password: passwordHash,
			role: "USER",
		},
	});
	return user;
};
