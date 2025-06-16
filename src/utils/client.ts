// lib/oauth/googleClient.ts (recommended to extract into a separate file)
import { providerOauth2Settings } from "@/utils/providerSettings";
import { AuthorizationCode } from "simple-oauth2";

export const createOauthClient = (provider: "google" | "facebook") => {
	const clientId = process.env[`AUTH_${provider.toUpperCase()}_ID`];
	const clientSecret = process.env[`AUTH_${provider.toUpperCase()}_SECRET`];

	console.log("clientId: --------- ", clientId);
	console.log("clientSecret: ------------- ", clientSecret);
	if (!clientId || !clientSecret) {
		throw new Error("cannot authorize");
	}
	const authClient = new AuthorizationCode({
		client: {
			id: clientId,
			secret: clientSecret,
		},
		auth: {
			tokenHost: providerOauth2Settings[provider].tokenHost,
			tokenPath: providerOauth2Settings[provider].tokenPath,
			authorizeHost: providerOauth2Settings[provider].authorizeHost,
			authorizePath: providerOauth2Settings[provider].authorizePath,
		},
	});

	return authClient;
};

// export const googleOAuthClient = createOauthClient("google");
