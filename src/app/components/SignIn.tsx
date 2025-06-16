import { redirectToAuthUrl } from "@/actions/oauthSignIn";

export default function SignIn({
	provider,
}: {
	provider: "google" | "facebook";
}) {
	return (
		<form
			action={async () => {
				"use server";
				await redirectToAuthUrl(provider, "account-123"); // * using dummy accountId for now.
				// dont add the redirect_uri in this method
				// handle that inside the route.ts
			}}
		>
			<button type="submit" className="bg-blue-400 p-2 rounded cursor-pointer">
				Signin with {provider}
			</button>
		</form>
	);
}

/* ------------------- using next-auth auth-url ------------------ */
// export default function SignIn() {
// 	return (
// 		<form
// 			action={async () => {
// 				"use server";
// 				await signIn("google");
// 				// dont add the redirect_uri in this method
// 				// handle that inside the route.ts
// 			}}
// 		>
// 			<button type="submit" className="bg-blue-400 p-2 rounded cursor-pointer">
// 				Signin with Google
// 			</button>
// 		</form>
// 	);
// }
