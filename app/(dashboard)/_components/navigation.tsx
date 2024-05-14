'use client'

import { useMedia } from 'react-use'
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'
import { Menu } from 'lucide-react'

const routes = [
    {
        href: "/",
        label: "Overview",
    },
    {
        href: "/transactions",
        label: "Transactions",
    },
    {
        href: "/accounts",
        label: "Accounts",
    },
    {
        href: "/categories",
        label: "Categories",
    },
    {
        href: "/settings",
        label: "Settings",
    }
]

export default function Navigation() {
    const pathname = usePathname()
    const router = useRouter()
    const isMobile = useMedia('(max-width: 1024px)', false)

    const [isOpen, setIsOpen] = useState(false)

    const onClick = (href: string) => {
        router.push(href)

        setIsOpen(false)
    }

    return isMobile ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>
                <Button variant='outline'
                    size='sm'
                    className='font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition'>
                    <Menu className="h-4 w-4" />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='px-2'>
                <nav className='flex flex-col gap-y-2 pt-6'>
                    {routes.map((route) => (
                        <Button variant={route.href === pathname ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => onClick(route.href)} 
                            key={route.href}>
                            {route.label}
                        </Button>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    ) : (
        <nav className='hidden lg:flex items-center gap-x-2 overflow-x-auto'>
            {routes.map((route) => (
                <Button key={route.href}
                    asChild
                    size="sm"
                    variant="outline"
                    className={cn("w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
                        route.href === pathname ? "bg-white/10 text-white" : "bg-transparent"
                    )}>
                    <Link href={route.href}>
                        {route.label}
                    </Link>
                </Button>
            ))}
        </nav>
    )
}
