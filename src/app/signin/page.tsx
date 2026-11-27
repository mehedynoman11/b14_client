'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
// import GoogleButton from "@/components/GoogleButton"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React from "react"
import toast from "react-hot-toast"

const SignInPage = () => {
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formValue = new FormData(e.currentTarget);
        const user = Object.fromEntries(formValue.entries()) as {
            email: string
            password: string
        }
        const signInData = {
            ...user,
        }
        const { data, error } = await authClient.signIn.email(signInData)
        if (data) {
            toast.success("Sign in successful!");
            console.log(data)
            // router.push('/');
        }
        if (error) {
            toast.error("Sign in failed: " + error.message);
            console.log(error);
        }
    }


    return (
        <div className="grid min-h-screen bg-background text-foreground lg:grid-cols-2">
            {/* Brand panel (hidden on small screens) */}
            <aside className="hidden flex-col justify-between bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url('/banner-img.png')] h-screen p-12 text-primary-foreground bg-cover bg-center bg-no-repeat lg:flex">
                <Link href="/" className="text-lg font-semibold">
                    PizzaHub
                </Link>
                <div className="space-y-4">
                    <h1 className="text-4xl font-semibold leading-tight">
                        Everything you need, <br /> all in one place.
                    </h1>
                    <p className="max-w-sm text-primary-foreground/80">
                        Sign in to start shopping, selling, or managing your marketplace.
                    </p>
                </div>
                <p className="text-sm text-primary-foreground/60">
                    © {new Date().getFullYear()} PizzaHub. All rights reserved.
                </p>
            </aside>
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <div className="flex w-full max-w-sm flex-col gap-6">
                    <Card className="border-border bg-card text-card-foreground shadow-lg">
                        <CardHeader className="text-center">
                            <CardTitle className="text-xl text-foreground">
                                Sign in to your account
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSignIn}>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">Email</FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <div className="flex items-center">
                                            <FieldLabel htmlFor="password">Password</FieldLabel>
                                        </div>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            placeholder="*********"
                                            required
                                        />
                                    </Field>
                                    <Field>
                                        <Button type="submit" className="w-full">
                                            Sign In
                                        </Button>
                                        <FieldDescription className="text-center">
                                            Don't have an account?{' '}
                                            <a href="/signup" className="text-primary hover:underline">
                                                Sign up
                                            </a>
                                        </FieldDescription>
                                    </Field>
                                    <Field>
                                        {/* <GoogleButton /> */}
                                    </Field>
                                </FieldGroup>
                            </form>
                        </CardContent>
                    </Card>
                    <FieldDescription className="px-6 text-center">
                        By clicking continue, you agree to our{' '}
                        <a href="#" className="text-primary hover:underline">Terms of Service</a>{' '}
                        and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                    </FieldDescription>
                </div>
            </div>
        </div>
    )
}

export default SignInPage