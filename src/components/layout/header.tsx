import { getSession } from "@/lib/auth";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth";

export default async function Header() {
    const session = await getSession();


    return (
        <header className="px-6 md:px-20 lg:px-44 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <span className="text-lg font-bold">Url shortener</span>
            </Link>

            {/* Logout Button */}
            {session?.userId ? (
                <Button onClick={logout} variant="outline">
                    Logout
                </Button>
            ) : (
                <Link href="/sign-in" className={cn(buttonVariants({ variant: "outline" }))}>
                    Login
                </Link>
            )}
        </header>
    );
}
