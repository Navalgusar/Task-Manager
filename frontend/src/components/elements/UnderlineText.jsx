
export default function UnderlineText({children, isActive=false, ...props}) {
    return (
        <button {...props} 
            className="h-8 flex items-center justify-center text-sm font-semibold opacity-70 hover:opacity-100 px-2 cursor-pointer group relative" 
            style={isActive ? {opacity: 1} : {}}
        >
            {children}

            <div className="border-2 absolute w-full rounded-full bottom-0 duration-200 transition-all group-active:w-[80%] opacity-0 group-hover:opacity-100 " 
                style={ isActive ? {width: '100%', opacity: 1} : {}} 
            />
        </button>
    )
}
