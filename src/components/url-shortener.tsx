'use client';

import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { addUrl, ShortenedUrl } from '@/actions/url';

interface UrlShortenerProps {
    onUrlAdded: (url: ShortenedUrl) => void;
}

export function UrlShortener({ onUrlAdded }: UrlShortenerProps) {
    const [url, setUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('url', url);
            const response = await addUrl(formData);

            if (response.success && response.data) {
                setUrl('');
                // Make sure we're passing the correct data structure
                onUrlAdded(response.data);
                toast.success('URL shortened successfully');
            } else {
                toast.error(response.message || 'Something went wrong');
            }
        } catch (error) {
            toast.error('Failed to shorten URL');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="relative">
            <Input
                type="url"
                name="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter the link here"
                className="pr-24"
                disabled={isLoading}
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                {url && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setUrl('')}
                        className="h-8 w-8 text-gray-800 hover:text-white"
                        disabled={isLoading}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    disabled={isLoading || !url}
                    className="h-8 w-8 text-gray-800 hover:text-white"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </form>
    );
}