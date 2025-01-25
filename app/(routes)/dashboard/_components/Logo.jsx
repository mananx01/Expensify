import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <div 
            onClick={() => router.replace('https://expensify001.netlify.app/dashboard')} 
            className='flex items-center gap-4 cursor-pointer'
        >
            <Image 
                src='/newlogo.svg'
                alt="logo image"
                width={50}
                height={30}
            />
            <h2 className='text-gray-300 text-2xl'>Expensify</h2>
        </div>
    );
};

export default Logo;

