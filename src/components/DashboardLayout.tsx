'use client'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import {
    ClipboardList,
    Heart,
    LayoutDashboard,
    PlusCircle,
    Settings,
    ShoppingBag,
    Store,
    Tags,
    User,
    Users,
    type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type Role = "customer" | "vendor" | "admin"

type MenuItem = {
    id: string
    name: string
    url: string
    item: LucideIcon
}

const isRole = (value: unknown): value is Role =>
    value === "customer" || value === "vendor" || value === "admin"

// `/dashboard/<role>/...` -> "<role>"
const roleFromPath = (pathname: string): Role | null => {
    const segment = pathname.split("/")[2]
    return isRole(segment) ? segment : null
}

// One menu per role
const menus: Record<Role, MenuItem[]> = {
    customer: [
        { id: "c-overview", name: "Overview", url: "/dashboard/customer", item: LayoutDashboard },
        { id: "c-orders", name: "My Orders", url: "/dashboard/customer/orders", item: ShoppingBag },
        { id: "c-favorites", name: "Favorites", url: "/dashboard/customer/favorites", item: Heart },
        { id: "c-profile", name: "Profile", url: "/dashboard/customer/profile", item: User },
    ],
    vendor: [
        { id: "v-overview", name: "Overview", url: "/dashboard/vendor", item: LayoutDashboard },
        { id: "v-products", name: "My Pizzas", url: "/dashboard/vendor/products", item: Store },
        { id: "v-add", name: "Add Pizza", url: "/dashboard/vendor/products/new", item: PlusCircle },
        { id: "v-orders", name: "Orders", url: "/dashboard/vendor/orders", item: ClipboardList },
        { id: "v-profile", name: "Profile", url: "/dashboard/vendor/profile", item: User },
    ],
    admin: [
        { id: "a-overview", name: "Overview", url: "/dashboard/admin", item: LayoutDashboard },
        { id: "a-users", name: "Users", url: "/dashboard/admin/users", item: Users },
        { id: "a-vendors", name: "Vendors", url: "/dashboard/admin/vendors", item: Store },
        { id: "a-orders", name: "All Orders", url: "/dashboard/admin/orders", item: ClipboardList },
        { id: "a-categories", name: "Categories", url: "/dashboard/admin/categories", item: Tags },
        { id: "a-settings", name: "Settings", url: "/dashboard/admin/settings", item: Settings },
    ],
}

const DashboardSidebar = () => {
    const { data: session } = useSession()
    const pathname = usePathname()

    const sessionRole = session?.user?.role
    const role: Role = isRole(sessionRole) ? sessionRole : (roleFromPath(pathname) ?? "customer")

    const items = menus[role]
    const base = `/dashboard/${role}`

    // Overview matches exactly; other items match their sub-pages too
    const isActive = (url: string) =>
        url === base ? pathname === url : pathname.startsWith(url)

    return (
        <Sidebar>
            <SidebarHeader className="px-4 py-3">
                <Link href="/" className="text-lg font-semibold">
                    PizzaHub
                </Link>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="capitalize">{role} panel</SidebarGroupLabel>
                    <SidebarMenu>
                        {items.map(({ id, name, url, item: Icon }) => (
                            <SidebarMenuItem key={id}>
                                <SidebarMenuButton
                                    isActive={isActive(url)}
                                    render={<Link href={url} />}
                                >
                                    <Icon />
                                    <span>{name}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="px-4 py-3">
                <p className="truncate text-sm font-medium">{session?.user?.name}</p>
                <p className="truncate text-xs text-muted-foreground">{session?.user?.email}</p>
            </SidebarFooter>
        </Sidebar>
    )
}

export default DashboardSidebar