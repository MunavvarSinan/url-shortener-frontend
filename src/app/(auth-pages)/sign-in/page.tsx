"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { SignInInput, signInSchema } from "@/actions/schema";
import { signIn } from "@/actions/auth";

export default function SignInPage() {
    const router = useRouter();
    const form = useForm<SignInInput>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    async function onSubmit(data: SignInInput) {
        try {
            await signIn(data);
            toast.success("Signed in successfully!");
            router.push("/url");
        } catch (error: any) {
            console.log(error);

            // Handle validation errors from backend
            if (error.errors) {
                error.errors.forEach((err: { path: string; message: string }) => {
                    form.setError(err.path as keyof SignInInput, {
                        type: "manual",
                        message: err.message,
                    });
                });
                return;
            }

            // Handle general errors (like invalid credentials)
            if (error.message) {
                toast.error(error.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    }

    return (
        <div className=" flex items-center justify-center  p-4">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting || !form.formState.isValid}
                            >
                                {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
                            </Button>
                            <p className="text-center text-sm text-gray-600">
                                {`Don't have an account?`}{" "}
                                <Link href="/sign-up" className="text-blue-600 hover:underline">
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
