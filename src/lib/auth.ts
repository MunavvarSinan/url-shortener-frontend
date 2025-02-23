'use server';

import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const SECRET_KEY = process.env.SECRET_KEY || 'dev-secret-key'; // Must match backend secret
const key = new TextEncoder().encode(SECRET_KEY);

interface SessionPayload {
    userId: number;
    token: string;
}

// Store Backend JWT in Cookies (NO NEW JWT CREATION)
export async function createSession(token: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days expiry

    // Store the backend token directly in cookies
    const cookieStore = await cookies(); // Await the promise
    cookieStore.set('session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    });
}

// Retrieve JWT from Cookies
export async function getSession(): Promise<SessionPayload | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;
    if (!token) return null;

    try {
        // Verify the token using the same secret as the backend
        const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] });
        return { userId: payload.id as number, token };
    } catch (error) {
        console.error('Invalid session:', error);
        return null;
    }
}

// Delete JWT from Cookies
export async function deleteSession() {
    const cookieStore = await cookies(); // Await the promise
    cookieStore.set('session', '', { expires: new Date(0), path: '/' });

}