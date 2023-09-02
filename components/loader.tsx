import { cn } from "@/lib/utils"

interface loaderProps {
    size : number,
    color : string
}

const Loader = ({size,color}:loaderProps)=>{
return(
<div className={cn(`h-[${size}px] w-[${size}px] border-t-[2px] border-[white]  rounded-full p-2 animate-spin mx-4`)}></div>
)
}

export default Loader