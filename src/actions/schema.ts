import { z } from "zod";

export const signUpSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(100)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const urlSchema = z.object({
    url: z.string().url(),
    customSlug: z.string().min(3).max(20).optional()
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type UrlInput = z.infer<typeof urlSchema>;