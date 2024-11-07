import type { RequestEvent } from "@sveltejs/kit";

export const setSessionTokenCookie = (
	event: RequestEvent,
	token: string,
	expiresAt: Date,
) => {
	event.cookies.set("session", token, {
		httpOnly: true,
		sameSite: "lax",
		expires: expiresAt,
		path: "/",
	});
};

export const deleteSessionTokenCookie = (event: RequestEvent) => {
	event.cookies.set("session", "", {
		httpOnly: true,
		sameSite: "lax",
		maxAge: 0,
		path: "/",
	});
};
