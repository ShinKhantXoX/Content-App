"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { FcGoogle } from "react-icons/fc"
import { signIn,signOut,useSession } from "next-auth/react";
import toast from "react-hot-toast"

import {
    Cloud,
    Github,
    LifeBuoy,
    LogOut,
    Facebook
  } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FlashImg } from "./Avator";

export function AuthTogle() {
    const { setTheme } = useTheme();
    const { data : session, status } = useSession({
      required : true
    });
    const [authenticated ,setAuthenticated] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    

    React.useEffect(() => {
        if(status === 'loading') {
            setLoading(true);
            toast.loading('loading...')
        } else {
            setLoading(false)
        }

        if(status === "authenticated") setAuthenticated(true);

        if(status === 'unauthenticated') setAuthenticated(false);

    } , [status])

    React.useEffect(() => {
        if(authenticated) toast.success("Login successfully")
    } ,[authenticated])


  
    return (
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{session?.user ? (
            <div className=" flex items-center gap-3">
                <FlashImg src={session?.user?.image} />
                <p>{session?.user?.name}</p>
            </div>
          ) : 'Login'}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sign in with different way</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem  
          disabled={loading}
          onClick={() => signIn('github')}>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
          disabled={loading}
          onClick={() => signIn('facebook')}>
            <Facebook className="mr-2 h-4 w-4" />
            <span>FaceBook</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
          disabled={loading}
          onClick={() => signIn('google')}>
            <FcGoogle size={40} className="mr-2 h-4 w-4" />
            <span>Google</span>
          </DropdownMenuItem>
          {
            session?.user && (
                <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => {signOut(), toast.success('LogOut successfully')}}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </>
            ) 
          }
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  