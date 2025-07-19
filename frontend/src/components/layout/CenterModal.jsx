import { FiX } from "react-icons/fi";

export default function CenterModal({children, title, visible, setVisible, className='', containerClassName=''}){

    function handleClick(e) {
        if(e.target === e.currentTarget) {
            setVisible(false);
        }
    }

    return visible ? (
        <div onClick={handleClick} className="w-screen h-screen backdrop-blur-[4px] bg-[rgb(0,0,0,0.4)] fixed top-0 left-0 z-[10000] flex items-center justify-center p-2">
            <div className={`bg-slate-900 ${containerClassName}`}
                style={{minWidth: '250px', borderRadius: '12px', paddingBlock: '16px'}}
            >
                <div className="flex items-center justify-between px-4" >
                    <h1>{title}</h1>

                    <button onClick={() => setVisible(false)} className="border-1 rounded-md p-1 hover:rotate-180 duration-200 cursor-pointer" >
                        <FiX />
                    </button>
                </div>

                <div className="border-1 w-full my-2 opacity-40" />

                <div className={className} style={{paddingInline: '16px'}}>
                    {children}
                </div>
            </div>
        </div>
    ) : null
}