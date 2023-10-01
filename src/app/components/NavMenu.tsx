'use client'
import { ModeToggle } from "./ModeToggle";
import { AuthTogle } from "./AuthToggle";
import { Button } from "@/components/ui/button";
import { BadgePlus } from "lucide-react";
import Link from "next/link";


function AuthButton () {
    

    return (
        <div className=' px-[30px] md:px-[70px] py-5 flex justify-between items-center'>
            <div>
                <p>Logo</p>
            </div>
            <div className=" flex items-start gap-5">
                <Link href={'/create'}>
                    <Button variant="outline"  className=" flex items-center gap-3">
                        New Content <BadgePlus className=" flex items-center gap-3" />
                    </Button>
                </Link>
                <ModeToggle />
                <AuthTogle />
            </div>
        </div>
    )

}   

export default function NavMenu () {
    return (
        <div>
            <AuthButton />
        </div>
    )
}