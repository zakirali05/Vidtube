import { cn } from "@/lib/utils"

interface loaderProps {
    size : number,
    color : string
}

const Loader = ({size,color}:loaderProps)=>{
return(
<div className={cn(`h-[${size}px] w-[${size}px] border-t-[2px] border-[${color}]  rounded-full p-2 animate-spin `)}></div>
)
}

export default Loader