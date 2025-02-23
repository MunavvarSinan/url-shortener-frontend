import { redirect } from "next/navigation";

export default function RedirectPage({ params }: { params: { shortCode: string } }) {
    // Ensure params is correctly passed
    if (!params?.shortCode) {
        return <h1>Invalid URL</h1>;
    }


    redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/url/${params.shortCode}`);
}
