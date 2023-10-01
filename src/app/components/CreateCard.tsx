'use client'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db } from "../../services/firebase"
import ProfileAvatar from "./ProfileAvatar"

export function CreateCard() {

  const [imageFile, setImageFile] = useState<File>()
  const [downloadURL, setDownloadURL] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progressUpload, setProgressUpload] = useState(0)

  const handleSelectedFile = (files: any) => {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0])

      console.log(files[0])
    } else {
      // message.error('File size to large')
    }
  }

  const handleUploadFile = () => {
    if (imageFile) {
      const name = imageFile.name
      const storageRef = ref(db, `images/${name}`)
      const uploadTask = uploadBytesResumable(storageRef, imageFile)

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100

          setProgressUpload(progress) // to show progress upload

          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          // message.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url)
          })
        },
      )
    } else {
      // message.error('File not found')
    }
  }

  const handleRemoveFile = () => setImageFile(undefined);

  console.log(imageFile?.name);
  console.log(imageFile?.size);
  


  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create content</CardTitle>
        <CardDescription>Cloud saving content</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className=" flex items-center justify-center">
              <ProfileAvatar 
              src={downloadURL} 
              imageFile={imageFile} 
              handleSelectedFile={handleSelectedFile} 
              progress={progressUpload}
              uploadFile={handleUploadFile}
              isLoading={isUploading}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" placeholder="Enter your phone" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="Enter your email" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
