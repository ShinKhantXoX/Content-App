'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { formatSizeUnits } from "@/services/FormatFileSize";
import { 
    Plus,
    Loader2
} from "lucide-react";
import { useEffect, useState } from "react";

const ProfileAvatar = (props: any) => {
    
    const [isDone, setIsDone] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    
    useEffect(() => {
        if(props?.progress === 100){
            setIsOpen(true);
        }
    }, [props?.progress])
    

  return (
    <>
      <Dialog
      defaultOpen={false}
      open={isOpen}
      onOpenChange={setIsOpen}
      >
        <DialogTrigger
        >
            <Avatar
            // onClick={() => {
            // document.getElementById("picture")?.click();
            // }}
            style={{
            width: "250px",
            height: "250px",
            }}
            >
            <AvatarImage src={props?.src ? props?.src : null} />
            <AvatarFallback>
            <Plus />
            </AvatarFallback>
        </Avatar>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload profile</DialogTitle>
            <DialogDescription>
            <div className="flex flex-col space-y-1.5 mt-5">

            <Label htmlFor="picture">Profile Picture</Label>
            <Input
                id="picture"
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                onChange={(files) => props?.handleSelectedFile(files.target.files)}
            />

            {
                props?.imageFile && (
                    <div className=" flex items-center gap-5">
                        <Badge variant={'outline'}>{props?.imageFile?.name}</Badge>
                        <Badge variant={'outline'}>{formatSizeUnits(props?.imageFile?.size)}</Badge>
                    </div>
                )
            }

            <div>

                <Button 
                disabled={props?.isLoading}
                onClick={() => props?.uploadFile()}
                variant={'default'}>
                  {props?.isLoading && <Loader2 />}  Upload
                </Button>

            </div>

            {props?.progress > 0 && (
                <Progress value={props?.progress} />
            )}

            </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileAvatar;
