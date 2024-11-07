import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
} from "$lib/api/cookies";
import { validateSessionToken } from "$lib/api/sessions";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get("session") ?? null;

	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;

		return resolve(event);
	}

	const { session, user } = await validateSessionToken(token);

	if (session !== null) {
		setSessionTokenCookie(event, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;

	return resolve(event);
};