import { useEffect, useState } from "react";

export function InputText({label, placeholder, className='', labelColor='black', labelBg='white', id=null, name='', color='white', bg='transparent', borderStyle='solid', borderWidth='2px', errorMsg='', value='', onChange, ...props}){
    if(!id) id = String(Math.floor(Math.random()*10000));

    const [text, setText] = useState(value);

    useEffect(() => {
        setText(value)
    }, [value])

    return <div>
        <div 
            className={className} 
            style={{
                position: 'relative',
                height: label ? '52px' : '40px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '14px',
                borderStyle,
                borderWidth,
                borderColor: color,
                backgroundColor: bg
            }}
        >
           <label 
                htmlFor={id}
                className="absolute top-0 translate-y-[-50%] items-center font-semibold rounded-lg h-5 px-3 text-xs transition-all duration-200 left-[20px] whitespace-nowrap"
                style={{
                    color: labelColor,
                    backgroundColor: labelBg,
                    display: label ? 'flex' : 'none'
                
                }}
            >{label}</label>
            <input 
                {...props}
                id={id} 
                name={name} 
                value={text}
                onChange={(e) => {setText(e.target.value); if(onChange) onChange(e);}}
                className="outline-none flex items-center w-full h-full px-5 rounded-[12px] pt-2" 
                type="text" 
                placeholder={placeholder}
            />
        </div>
        {errorMsg ? <p className="text-xs pl-4 text-red-500">{errorMsg}</p> : null}
    </div>
}



export function InputTextArea({className='', labelColor='black', labelBg='white', label='', placeholder='', id=null, name='', color='white', bg='transparent', borderStyle='solid', borderWidth='2px', height='100px'}){
    if(!id) id = String(Math.floor(Math.random()*10000));

    return <>
        <div 
            className={className} 
            style={{
                position: 'relative',
                height,
                display: 'flex',
                borderRadius: '14px',
                borderStyle,
                borderWidth,
                borderColor: color,
                backgroundColor: bg,
                paddingTop: '14px'
            }}
        >
           <label 
                htmlFor={id}
                className="absolute top-0 translate-y-[-50%] items-center font-semibold rounded-lg h-5 px-3 text-xs transition-all duration-200 left-[20px] whitespace-nowrap"
                style={{
                    color: labelColor,
                    backgroundColor: labelBg,
                    display: label ? 'flex' : 'none'
                
                }}
            >{label}</label>
            <textarea 
                id={id} 
                name={name} 
                className="outline-none flex items-center w-full px-5 resize" 
                type="text" 
                placeholder={placeholder}
            />
        </div>
    </>
}