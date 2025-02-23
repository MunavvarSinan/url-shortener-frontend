'use server';

import { createSession, deleteSession } from '@/lib/auth';
import type { SignUpInput, SignInInput } from './schema';
import { redirect } from 'next/navigation';

const API_BASE_URL = 'http://localhost:8000/api/v1/auth';



export async function signUp({ email, password, username }: SignUpInput) {
    const response = await fetch(`${API_BASE_URL}/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
    });

    const data = await response.json();

    if (!response.ok) {
        // Convert response into a proper Error instance
        const error = new Error(data.message || "Something went wrong");
        (error as any).errors = data.errors || [];
        throw error;
    }

    await createSession(data.token);
    return data;
}



export async function signIn({ email, password }: SignInInput) {
    const response = await fetch(`${API_BASE_URL}/sign-in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.message || "Invalid credentials");
        (error as any).errors = data.errors || [];
        throw error;
    }
    // Store session (example, modify based on your auth system)
    await createSession(data.data.token);
    return data;
}



export async function logout() {
    await deleteSession();
    redirect("/sign-in");
}