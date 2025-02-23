'use client';

import { useState, useTransition } from 'react';
import { MoreVertical, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UrlShortener } from './url-shortener';
import { toast } from 'sonner';
import { deleteUrl, ShortenedUrl } from '@/actions/url';

interface UrlListProps {
    initialUrls: ShortenedUrl[];
}

export function UrlList({ initialUrls }: UrlListProps) {
    const [urls, setUrls] = useState<ShortenedUrl[]>(initialUrls);
    const [isPending, startTransition] = useTransition();

    function handleUrlAdded(newUrl: ShortenedUrl) {
        // Ensure we're working with the latest state
        setUrls(currentUrls => [newUrl, ...currentUrls]);
    }

    async function handleDelete(id: string) {
        startTransition(async () => {
            const response = await deleteUrl(id);
            if (response.success) {
                setUrls(currentUrls => currentUrls.filter((url) => url.id !== id));
                toast.success('URL deleted successfully');
            } else {
                toast.error(response.message || 'Something went wrong');
            }
        });
    }

    async function copyToClipboard(text: string) {
        await navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard');
    }

    return (
        <div className="space-y-6">
            <UrlShortener onUrlAdded={handleUrlAdded} />

            {urls.length === 0 ? (
                <div className="text-center text-zinc-500 py-8">No shortened URLs yet</div>
            ) : (
                <div className="space-y-3">
                    {urls.map((url) => (
                        <div key={url.id} className="border border-gray-200 shadow-sm rounded-lg p-4 flex items-center gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-black font-medium truncate">{`${process.env.NEXT_PUBLIC_FRONTEND_URL}/url/${url.short_code}`}</h3>
                                <p className="text-sm text-zinc-500 truncate">{url.url}</p>
                            </div>
                            <div className="flex items-center gap-2 text-zinc-500">
                                <span className="text-sm">{url.visitors} visits</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem onClick={() => copyToClipboard(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/url/${url.short_code}`)}>
                                            <Copy className="h-4 w-4 mr-2" />
                                            Copy URL
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => window.open(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/url/${url.short_code}`, '_blank')}>
                                            <ExternalLink className="h-4 w-4 mr-2" />
                                            Visit URL
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="text-red-500"
                                            onClick={() => handleDelete(url.id)}
                                            disabled={isPending}
                                        >
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}