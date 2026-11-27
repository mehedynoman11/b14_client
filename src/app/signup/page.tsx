'use client'

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

type Role = "customer" | "vendor" | "admin"

const roles: { value: Role; title: string; hint: string }[] = [
    { value: "customer", title: "Customer", hint: "Browse and buy" },
    { value: "vendor", title: "Vendor", hint: "List and sell" },
    { value: "admin", title: "Admin", hint: "Manage the platform" },
]

const SignUpPage = () => {
    const router = useRouter()
    const [role, setRole] = useState<Role>("customer")
    const [loading, setLoading] = useState(false)

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = Object.fromEntries(new FormData(e.currentTarget)) as {
            name: string
            image: string
            email: string
            password: string
        }
        const signUpData = {
            ...form,
            accountType: role,
        }
        setLoading(true)
        const { data, error } = await authClient.signUp.email(signUpData)
        setLoading(false)

        if (error) {
            toast.error(error.message || "Sign up failed. Please try again.")
            return
        }
        toast.success("Welcome aboard! Your account is ready.")
        console.log(data)
        router.push("/")
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
                        Create a free account to start shopping, selling, or managing your marketplace.
                    </p>
                </div>
                <p className="text-sm text-primary-foreground/60">
                    © {new Date().getFullYear()} PizzaHub. All rights reserved.
                </p>
            </aside>

            {/* Form panel */}
            <main className="flex items-center justify-center p-6 md:p-4">
                <div className="w-full max-w-sm space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold">Create your account</h2>
                        <p className="text-sm text-black/60">
                            Already registered?{" "}
                            <Link href="/signin" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form onSubmit={handleSignUp}>
                        <FieldGroup>
                            {/* Role picker */}
                            <Field>
                                <FieldLabel>I want to join as</FieldLabel>
                                <div className="grid grid-cols-3 gap-2">
                                    {roles.map((r) => (
                                        <button
                                            key={r.value}
                                            type="button"
                                            onClick={() => setRole(r.value)}
                                            aria-pressed={role === r.value}
                                            className={`rounded-lg border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${role === r.value
                                                    ? "border-primary bg-primary/10"
                                                    : "border-input hover:bg-muted"
                                                }`}
                                        >
                                            <span className="block text-sm font-medium">{r.title}</span>
                                            <span className="block text-xs text-muted-foreground">{r.hint}</span>
                                        </button>
                                    ))}
                                </div>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="name">Full name</FieldLabel>
                                <Input id="name" name="name" placeholder="John Doe" required />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="image">Profile photo link</FieldLabel>
                                <Input
                                    id="image"
                                    name="image"
                                    type="url"
                                    placeholder="https://example.com/me.jpg"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="At least 8 characters"
                                    minLength={8}
                                    required
                                />
                            </Field>
                            <Field>
                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Creating account..." : "Create account"}
                                </Button>
                                <FieldDescription className="text-center">
                                    By signing up, you agree to our{" "}
                                    <Link href="#" className="text-primary hover:underline">Terms</Link> and{" "}
                                    <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default SignUpPage