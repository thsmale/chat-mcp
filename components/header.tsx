import { Separator } from "@/components/ui/separator"
import Flag from 'react-world-flags';

export default function Header() {
    return (
        <div className='justify-center'>
            <div className="flex py-4 gap-4 ml-[20px]">
                <Flag code="USA" width={40} />
                <div className='flex gap-1'>
                    <p className='font-bold'>USA</p>
                    <p>Spending Assistant</p>
                </div>
            </div>
            <Separator orientation="horizontal" />
        </div>
    )
}