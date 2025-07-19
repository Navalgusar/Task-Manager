import { Link } from "react-router-dom";
import LabelView from "../view/LabelView";
import { FiLogOut } from "react-icons/fi";
import { useStore } from "../../context/StoreProvider";


const navigation = {
    'user': [
        {title: 'Home', href: '/home'},
        {title: 'Tasks', href: '/tasks'},
        {title: 'Setting', href: '/setting'},
    ]
}

export default function Navbar() {
    const {userInfo} = useStore();

    if(!userInfo.role) return null;

    return (
        <nav className="sticky shrink-0 z-[500] top-0 w-full flex items-center justify-between px-5 min-h-16 font-sans text-sm shadow-[0_0_1px] backdrop-blur-sm bg-transparent">
             <div className="flex items-center gap-5">
                <Link to={'/'} className="font-bold text-mg flex items-center gap-2 opacity-90 active:opacity-100 md:hover:opacity-100 transition-all cursor-pointer ease-in-out">
                    <div className="size-10 flex items-center justify-center md:hidden bg-slate-900 rounded "><img src="./logo.svg"/></div>
                    <div className="pb-[1px] max-md:hidden ">Task Manager</div>
                </Link>

                <div className="flex sm:gap-2 font-semibold">
                    {navigation['user'].map((element, index) => (
                        <Link key={index} to={element.href} className="opacity-70 hover:opacity-100">
                            <p className={`relative w-fit flex items-center justify-center after:content-[''] after:absolute after:border-2 after:border-[var(--text)] after:rounded-full after:w-0 sm:hover:after:w-full max-sm:active:after:w-full px-2 after:top-full after:opacity-0 sm:hover:after:opacity-70 max-sm:active:after:opacity-70 after:transition-all sm:duration-200`} >{element.title}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}