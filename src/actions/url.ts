"use server"

import { getSession } from "@/lib/auth"
import { revalidatePath } from "next/cache"

const API_BASE = 'https://url-shortener-api.duckdns.org/api/v1';

export type ShortenedUrl = {
    id: string;
    url: string;
    short_code: string;
    visitors: number;
    createdAt: string;
    updatedAt: string;
    user_id: string;
}

export async function addUrl(formData: FormData) {
    const url = formData.get("url") as string
    const session = await getSession()

    if (!url) {
        return { success: false, message: "URL is required" }
    }

    try {
        const res = await fetch(`${API_BASE}/url`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session!.token}`,
            },
            body: JSON.stringify({ url }),
        })

        if (!res.ok) {
            throw new Error('Failed to create URL')
        }

        const responseData = await res.json()

        // Make sure we're returning the data in the correct format
        return {
            success: true,
            data: responseData.data // This should be a single URL object
        }
    } catch (error) {
        console.error('Error adding URL:', error)
        return { success: false, message: "Failed to shorten URL" }
    }
}

export async function getUrls(): Promise<ShortenedUrl[]> {
    const session = await getSession()
    try {
        const res = await fetch(`${API_BASE}/url`, {
            headers: {
                Authorization: `Bearer ${session!.token}`,
            },
        })

        const data = await res.json()
        return data.data as ShortenedUrl[] || []
    } catch (error) {
        console.error('Error getting URLs:', error)
        return []
    }
}

export async function deleteUrl(id: string) {
    const session = await getSession()

    try {
        await fetch(`${API_BASE}/url/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${session!.token}`,
            },
        })
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error('Error deleting URL:', error)
        return { success: false, message: "Failed to delete URL" }
    }
}

