import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("Seeding database...");

	console.log("Creating SUPER permission...");

	const superPermission = await prisma.permission.create({
		data: {
			name: "SUPER",
		},
	});

	console.log("Creating superadmin role...");

	const superadmin = await prisma.role.create({
		data: {
			name: "SuperAdmin",
			permissions: {
				connect: {
					id: superPermission.id,
				},
			},
		},
	});

	console.log("Creating superadmin user...");

	const username = Bun.env.APP_SUPERADMIN_USERNAME;
	const password = Bun.env.APP_SUPERADMIN_PASSWORD;

	const missingEnvVars = [
		...(!username ? "APP_SUPERADMIN_USERNAME" : []),
		...(!password ? "APP_SUPERADMIN_PASSWORD" : []),
	];

	if (missingEnvVars.length > 0) {
		throw new Error(
			`Missing environment variables: ${missingEnvVars.join(", ")}`,
		);
	}

	const passwordHash = await Bun.password.hash(password || "", {
		memoryCost: 19456,
		timeCost: 2,
		algorithm: "argon2id",
	});

	const user = await prisma.user.create({
		data: {
			username: username || "",
			password: passwordHash,
			role: {
				connect: {
					id: superadmin.id,
				},
			},
			email: "admin@admin.fr",
		},
	});

	console.log("Created user:", user.username);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
