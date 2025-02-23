"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupFormSchema, type SignupFormValues } from "@/actions/schema";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { signUp } from "@/actions/auth";

export default function SignUpPage() {
    const router = useRouter();
    const form = useForm<SignupFormValues>({
        resolver: zodResolver(SignupFormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onChange", // Enable validation as user types
    });

    async function onSubmit(data: SignupFormValues) {
        try {
            await signUp(data);
            toast.success("Account created successfully!");
            router.push("/auth/signin");
        } catch (error: any) {
            if (error.errors) {
                // Handle validation errors from the backend
                error.errors.forEach((err: { path: string; message: string }) => {
                    form.setError(err.path as any, {
                        type: "manual",
                        message: err.message,
                    });
                });
            } else {
                toast.error(error.message || "Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="johndoe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="john@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Creating account..." : "Sign Up"}
                            </Button>
                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link href="/auth/signin" className="text-blue-600 hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}