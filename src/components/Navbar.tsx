'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, LogOut, Menu, Settings } from 'lucide-react';
import logo from '../assets/pizza_logo.png';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';

const links = [
    { href: '/', label: 'Home' },
    { href: '/menu', label: 'Menu' },
    { href: '/contact', label: 'Contact' },
];

// Replace with your real auth user (set to null when logged out)
const user: { name: string; email: string; image?: string } | null = {
    name: 'Noman',
    email: 'noman@example.com',
    image: '',
};

const Navbar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        // call your signOut() here
    };

    const initials = user?.name.slice(0, 2).toUpperCase();

    return (
        <nav className="sticky top-0 z-50 border-b bg-orange-50/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <Image src={logo} alt="PizzaHub" width={30} height={30} />
                    <span className="text-xl font-bold text-red-500">PizzaHub</span>
                </Link>

                {/* Desktop links */}
                <ul className="hidden items-center gap-6 font-medium md:flex">
                    {links.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`transition-colors hover:text-red-500 ${
                                    pathname === link.href ? 'text-red-500' : 'text-foreground'
                                }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop auth */}
                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <DropdownMenu>
                            {/* Trigger is already a <button>, so no wrapper needed */}
                            <DropdownMenuTrigger className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-red-500">
                                <Avatar>
                                    <AvatarImage src={user.image} alt={user.name} />
                                    <AvatarFallback>{initials}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={user.image} alt={user.name} />
                                            <AvatarFallback>{initials}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{user.name}</span>
                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem render={<Link href="/dashboard" />}>
                                    <LayoutDashboard /> Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuItem render={<Link href="/profile" />}>
                                    <Settings /> Profile Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                                    <LogOut /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Button variant="ghost" nativeButton={false} render={<Link href="/signin" />}>
                                Sign in
                            </Button>
                            <Button
                                nativeButton={false}
                                className="bg-red-500 hover:bg-red-600"
                                render={<Link href="/signup" />}
                            >
                                Get Started
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile menu */}
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger
                        render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}
                    >
                        <Menu className="size-6" />
                    </SheetTrigger>
                    <SheetContent side="right" className="w-72">
                        <SheetHeader>
                            <SheetTitle className="text-red-500">PizzaHub</SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-1 px-4">
                            {user && (
                                <div className="mb-3 flex items-center gap-3 border-b pb-3">
                                    <Avatar>
                                        <AvatarImage src={user.image} alt={user.name} />
                                        <AvatarFallback>{initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{user.name}</span>
                                        <span className="text-xs text-muted-foreground">{user.email}</span>
                                    </div>
                                </div>
                            )}

                            {links.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setOpen(false)}
                                    className={`rounded-md px-3 py-2 font-medium hover:bg-accent ${
                                        pathname === link.href ? 'text-red-500' : ''
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            <div className="mt-3 flex flex-col gap-2 border-t pt-3">
                                {user ? (
                                    <>
                                        <Button
                                            variant="outline"
                                            nativeButton={false}
                                            render={<Link href="/dashboard" onClick={() => setOpen(false)} />}
                                        >
                                            <LayoutDashboard /> Dashboard
                                        </Button>
                                        <Button
                                            variant="outline"
                                            nativeButton={false}
                                            render={<Link href="/profile" onClick={() => setOpen(false)} />}
                                        >
                                            <Settings /> Profile Settings
                                        </Button>
                                        <Button variant="destructive" onClick={handleLogout}>
                                            <LogOut /> Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            variant="outline"
                                            nativeButton={false}
                                            render={<Link href="/signin" onClick={() => setOpen(false)} />}
                                        >
                                            Sign in
                                        </Button>
                                        <Button
                                            nativeButton={false}
                                            className="bg-red-500 hover:bg-red-600"
                                            render={<Link href="/signup" onClick={() => setOpen(false)} />}
                                        >
                                            Get Started
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;