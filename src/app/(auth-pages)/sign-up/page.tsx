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
// import { AlertCircle } from "lucide-react";
import { SignUpInput, signUpSchema } from "@/actions/schema";
import { signUp } from "@/actions/auth";

export default function SignUpPage() {
    const router = useRouter();
    const form = useForm<SignUpInput>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    async function onSubmit(data: SignUpInput) {
        try {
            await signUp(data);
            toast.success("Account created successfully!");
            router.push("/url")
        } catch (error: any) {
            console.log(error);

            // Handle validation errors from backend
            if (error.errors && Array.isArray(error.errors)) {
                error.errors.forEach((err: { path: string; message: string }) => {
                    form.setError(err.path as any, {
                        type: "manual",
                        message: err.message,
                    });
                });
                return;
            }

            // Handle other errors
            toast.error(error.message || "Something went wrong. Please try again.");
        }
    }


    return (
        <div className=" flex justify-center  p-4">
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Sign Up</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* {form.formState.errors.root && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>
                                        {form.formState.errors.root.message}
                                    </AlertDescription>
                                </Alert>
                            )} */}

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
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting || !form.formState.isValid}
                            >
                                {form.formState.isSubmitting ? "Creating account..." : "Sign Up"}
                            </Button>
                            <p className="text-center text-sm text-gray-600">
                                Already have an account?{" "}
                                <Link href="/sign-in" className="text-blue-600 hover:underline">
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