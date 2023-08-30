
import { initialUser } from "@/lib/initial-user"
import { UserButton} from "@clerk/nextjs"

export default async function Home() {
const user = await initialUser()
  return (
    <div className='text-indigo-500 font-bold'>
    
   
    </div>
  )
}
