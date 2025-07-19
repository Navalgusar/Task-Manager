import { useEffect, useMemo } from "react";
import Navbar from "../components/layout/Navbar";
import { TypingOnHover } from "../components/other/TypingOnHover";
import { useStore } from "../context/StoreProvider";
import NoteWriter from "../components/other/NoteWriter ";
import Button from "../components/elements/Button";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

    const navigation = useNavigate()
    const {userInfo} = useStore();

    return (
        <div className="w-full h-full items-center flex flex-col gap-5">
            <Navbar />
            <div className="max-w-[1024px] w-full px-5 relative" >
                <div className="flex gap-5 w-full justify-between max-sm:flex-col-reverse items-center" >
                    <div className="flex-1">
                        <div className="font-serif transition-all text-3xl md:text-5xl font-semibold">
                            <div className="">Hello!,</div>
                            
                            <div className="max-sm:hidden text-[1.5em]">
                                <TypingOnHover
                                    className="capitalize"
                                    animationDuration={300}
                                    animationDelay={60}
                                    text={userInfo?.name ?? ''}
                                />
                            </div>
                            <div className="sm:hidden">{
                                (userInfo?.name || '').length < 6 ?
                                    userInfo.name
                                    : userInfo.name.slice(0,6) + '...'
                            }</div>
                        </div>

                        <p className="pt-5 text-sm opacity-70 max-w-[400px]" >
                            Click belowe button to see your all tasks and projects. Stay organized and on top of your schedule.
                        </p>

                        <div className="mt-5 text-[3vmax] font-sans font-semibold flex items-center gap-2 flex-wrap  ">
                            <p>See Tasks,</p>
                            <div className="text-sm">
                                <Button className="animate-bounce top-2" onClick={()=>{navigation('/tasks')}} bg >Tasks</Button>
                            </div>
                        </div>
                        
                    </div>
                    
                    
                    <NoteWriter storageKey="my-daily-note" size={'40vmax'} style={{maxWidth: '350px'}} />
                </div>

                <div className="fixed top-20 right-10" >
                </div>
            </div>
        </div>
    )
}