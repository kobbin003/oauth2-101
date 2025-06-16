import { providerOauth2Settings } from "@/utils/providerSettings";
import { NextResponse } from "next/server";
import { createOauthClient } from "../../../../../utils/client";

// The client you created from the Server-Side Auth instructions
export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url);
	console.log("request-url: ", request.url);
	const code = searchParams.get("code");
	const state = searchParams.get("state");

	if (code && state) {
		const decodedVal = decodeURIComponent(state);
		const parsed = JSON.parse(decodedVal) as {
			provider: "google" | "facebook";
			accountId: string;
		};
		const { provider, accountId } = parsed;
		/* --------------------------------------------------------------- */
		console.log(
			"code: ........",
			code,
			" accountId: ........",
			accountId,
			"provider......",
			provider
		);

		if (provider && accountId) {
			try {
				const tokenParams = {
					code,
					redirect_uri: providerOauth2Settings[provider].redirectUri,
				};

				const client = createOauthClient(provider);

				const accessToken = await client.getToken(tokenParams);

				console.log("accessToken", accessToken);

				// TODO: validate that the accountID passed in the param is a sub-account of the "auth-user"
				// const refreshedToken = await accessToken.refresh();
				// console.log("refreshedToken: ", refreshedToken);
			} catch (error) {
				console.log("some-error: ", error);
			}
		}
		/* --------------------------------------------------------------- */

		const next = "/success";
		return NextResponse.redirect(`${origin}${next}`);
	}
	return NextResponse.redirect(`${origin}`);
}
// export async function GET(request: Request) {
// 	const { searchParams, origin } = new URL(request.url);
// 	const code = searchParams.get("code");

// 	if (code) {
// 		console.log("code: ........", code);
// 		const tokenParams: AuthorizationTokenConfig = {
// 			code,
// 			redirect_uri: "http://localhost:3000/api/auth/callback/google", // this should be the same as provided to the google console. used for "validation"
// 			// scope: "email profile",
// 			// grant_type: "authoriation_code",
// 		};

// 		try {
// 			const next = "/success";
// 			const accessToken = await googleOAuthClient.getToken({
// 				code,
// 				redirect_uri: "http://localhost:3000/api/auth/callback/google",
// 			});
// 			console.log("accessToken-----------", accessToken);
// 			return NextResponse.redirect(`${origin}${next}`);
// 		} catch (error) {
// 			if (error instanceof Error) {
// 				console.log("Access Token Error", error);
// 			} else {
// 				console.log("Unknown Error ocurred");
// 			}
// 		}
// 	}
// 	return NextResponse.redirect(
// 		`${origin}/auth/error?error=token_exchange_failed`
// 	);
// }
