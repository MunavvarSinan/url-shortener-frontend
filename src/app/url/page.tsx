import { getUrls } from "@/actions/url"
import { UrlList } from "@/components/url-list"

export default async function Urls() {
    const urls = await getUrls()

    return (
        <main className="w-full p-4 md:p-8">
            <div className="mx-auto max-w-5xl">
                <UrlList initialUrls={urls} />
            </div>
        </main>
    )
}

