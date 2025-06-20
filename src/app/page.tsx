import Image from "next/image";
import SignIn from "./components/SignIn";

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<SignIn provider="google" />
			<SignIn provider="facebook" />
		</div>
	);
}
