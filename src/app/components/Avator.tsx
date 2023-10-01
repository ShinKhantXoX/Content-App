import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function FlashImg({src} : { src : any}) {
    return (
        <Avatar style={{
            width : '20px',
            height : '20px'
        }}>
        <AvatarImage src={src} />
        <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}