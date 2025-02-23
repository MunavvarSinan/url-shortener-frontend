// src/app/url/[shortCode]/page.tsx
import { redirect } from "next/navigation";

export default async function RedirectPage({ params }: { params: Promise<{ shortCode: string }> }) {
    const { shortCode } = await params; // Await the params to resolve the Promise

    if (!shortCode) {
        return null; // No UI needed since we're redirecting
    }

    redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/url/${shortCode}`);

    return null; // This prevents React from expecting JSX
}