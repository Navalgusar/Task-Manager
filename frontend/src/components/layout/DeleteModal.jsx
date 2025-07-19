import { FiAlertTriangle } from "react-icons/fi";
import CenterModal from "./CenterModal";
import { useState } from "react";

export default function DeleteModal({visible, setVisible, handleDelete, passKey='delete', msg}) {

    const [text, setText] = useState('')

    function handlePassKey() {
        if(text === passKey)
            handleDelete();
    }

    return (
        <CenterModal
            title={'Waring Delete'}
            visible={visible} setVisible={setVisible}
            containerClassName="max-w-[500px] w-full text-red-500"
            className="flex flex-col items-center gap-4"
        >
            <div className="flex items-center flex-col gap-1" >
                <FiAlertTriangle className="text-red-500 size-14" />
                <h1>{msg}</h1>
                <p className="text-sm mb-4">Type "{passKey}" to continue delte process</p>
            </div>
            <input 
                type="text" 
                value={text}
                onChange={(e) => {setText(e.target.value)}}
                autoCorrect="false"
                autoComplete="false"
                autoFocus
                placeholder={`Type ${passKey}`}
                className="border-0 border-b-2 w-full max-w-[300px] h-10 outline-none px-2" 
            />
            <button onClick={handlePassKey} className="text-white bg-red-500 h-10 max-w-[320px] w-full flex items-center justify-center rounded-xl opacity-80 hover:opacity-100 duration-200 cursor-pointer font-semibold active:scale-95" >Delete</button>
        </CenterModal>
    )
} 