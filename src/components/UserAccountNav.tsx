'use client'

import React from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { User } from 'next-auth'
import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import UserAvatar from './UserAvatar'

type Props = {
    user: User
}

const UserAccountNav = ({user}: Props) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            {/* <a className="border border-black rounded-lg px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white"
                href="#">Menu</a> */}
            <UserAvatar user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <div className="flex items-center justify-start gap-2 py-2">
                <div className="flex flex-col space-y-2 leading-none">
                    {user?.name && (<p className="font-medium">{user.name}</p>)}
                    {user?.email && (<p className="w-[200px] truncate text-sm text-secondary-foreground">{user.email}</p>)}
                </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onSelect={() => {
                    signOut()}
                }
                className="flex items-center gap-2 text-red-600 cursor-pointer"
            >
                Sign out
                <LogOut className="w-4 h-4 ml-2" />
            </DropdownMenuItem>
        </DropdownMenuContent>

    </DropdownMenu>
  )
}

export default UserAccountNav