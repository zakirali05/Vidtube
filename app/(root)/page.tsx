
import { ScrollArea } from "@/components/ui/scroll-area"
import VideoGrid from "@/components/video-grid"
import { initialUser } from "@/lib/initial-user"
import { UserButton} from "@clerk/nextjs"

export default async function Home() {
const user = await initialUser()
  return (
    <ScrollArea className='h-screen pt-7'>
   <VideoGrid/>
    </ScrollArea>
  )
}
