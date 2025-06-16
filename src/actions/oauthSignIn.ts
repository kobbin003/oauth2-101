"use server";

import { createOauthClient } from "@/utils/client";
import { providerOauth2Settings } from "@/utils/providerSettings";
import { redirect } from "next/navigation";

// TODO: we can make the state value to be dynamic from the argument.
export const redirectToAuthUrl = async (
	provider: "google" | "facebook",
	accountId: string
	// state?: any
) => {
	const client = createOauthClient(provider);
	const authorizationUri = client.authorizeURL({
		redirect_uri: providerOauth2Settings[provider].redirectUri,
		scope: providerOauth2Settings[provider].scope,
		state: encodeURIComponent(JSON.stringify({ provider, accountId })),
		// @ts-ignore: Google requires this to return refresh_token
		access_type: provider == "google" ? "offline" : "",
		prompt: provider == "google" ? "consent" : "",
		// mine
		// provider, //-> to detect in the route
		// accountId, // -> to know which account is linked
	});

	console.log("authorizationUri: ", authorizationUri);
	redirect(authorizationUri);
	// return { redirectUrl: authorizationUri };
	// NextResponse.redirect(authorizationUri);
};
