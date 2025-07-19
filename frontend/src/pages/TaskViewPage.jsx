import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/layout/Navbar";
import { FiPaperclip } from "react-icons/fi";
import Button from "../components/elements/Button";
import { useStore } from "../context/StoreProvider";
import UserSelectorModal from "../components/other/UserSelectorModal";

export default function TaskViewPage(){
    const {id} = useParams();
    const navigation = useNavigate();

    if(!id) navigation(-1);

    const [taskInfo, setTaskInfo] = useState({})

    useEffect(() => {

    }, [])

    return (
        <div className="w-full h-full items-center flex flex-col">
            <Navbar />
            <div className="flex flex-col py-5 px-5 sm:p-10 max-w-[1024px] w-full items-center gap-4 ">

                <div className="flex flex-col items-center w-full gap-3" >
                    <div className="self-start text-md pl-2 opacity-80 font-semibold">Task Information</div>

                    <div className="rounded-lg bg-slate-900 w-full px-5 h-10 flex items-center justify-between" >
                        <div>Assign by</div>
                        <div className="opacity-80">Admin</div>
                    </div>
                   
                    <div className="rounded-lg bg-slate-900 w-full px-5 h-10 flex items-center justify-between" >
                        <div>Date</div>
                        <div className="opacity-80"></div>
                    </div>
                </div>
                
                <div className="flex flex-col items-center w-full gap-3" >
                    <div className="self-start text-md pl-2 opacity-80 font-semibold">Task Title</div>

                    <div className="rounded-lg bg-slate-900 w-full px-5 h-10 flex items-center " >
                        Task Title ...
                    </div>
                </div>
                
                <div className="flex flex-col items-center w-full gap-3" >
                    <div className="self-start text-md pl-2 opacity-80 font-semibold">Task Discription</div>

                    <div className="rounded-lg bg-slate-900 w-full px-5 h-10 flex items-center " >
                        Task Discription ...
                    </div>
                </div>
                
                <div className="flex flex-col items-center w-full gap-3" >
                    <div className="self-start text-md pl-2 opacity-80 font-semibold">Submition Attachment</div>

                    <button 
                        className="rounded-lg bg-slate-900 w-full p-2 flex items-center gap-2 cursor-pointer " 
                    >
                        <div className="bg-slate-800 flex items-center justify-center rounded-sm aspect-square min-w-10 ">
                            <FiPaperclip className="size-6" />
                        </div>
                        
                        <div className="flex flex-col text-left">
                            <div className="text-sm">Attachment</div>
                            <p className="text-xs opacity-70" >Add attachment with task sumbmition</p>
                        </div>
                    </button>

                    <div className="w-full flex " >
                        <Button bg className="flex-1" >Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}