console.log("base-url:------------------ ", process.env.BASE_URL);
export const providerOauth2Settings: Partial<
	Record<"google" | "facebook", any>
> = {
	google: {
		tokenHost: "https://accounts.google.com",
		tokenPath: "/o/oauth2/token",
		authorizePath: "/o/oauth2/v2/auth",
		redirectUri: `${process.env.BASE_URL}/api/auth/callback/google`,
		scope: "email profile",
	},
	facebook: {
		tokenHost: "https://graph.facebook.com",
		tokenPath: "/v15.0/oauth/access_token", // or latest version (e.g. /v19.0/)
		authorizeHost: "https://www.facebook.com",
		authorizePath: "/v15.0/dialog/oauth",
		redirectUri: `${process.env.BASE_URL}/api/auth/callback/google`,
		scope: "email public_profile",
	},
};
