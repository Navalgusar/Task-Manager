import { useState } from "react"


export default function LabelView({lable, children, className, position, margin=4, translateX=0}) {

    const [isHove, setHover] = useState(false);

    return (
        <div 
            onMouseLeave={() => setHover(false)}    
            onMouseEnter={() => setHover(true)} 
            className={className} 
            style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default'}}
        >
            {children}
            <div className="absolute bg-gray-500 px-2 rounded-lg h-8 flex items-center transition-all justify-center" 
                style={{
                    [position]: margin * position === 'top' ? 1 : -1, 
                    scale: isHove ? 1 : 0.5, 
                    opacity: isHove ? 1 : 0, 
                    visibility: isHove ? 'visible' : 'hidden',
                    transform: `${
                        position === 'top' ? 
                            isHove ? 'translateY(-100%)' : 'translatey(-50%)' 
                            : 
                            isHove ? 'translateY(100%)' : 'tranalateY(50%)'
                        } translateX(${translateX})`, 
                }}
            >{lable}</div>
        </div>
    )
}