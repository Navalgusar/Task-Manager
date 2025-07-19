import { Link, useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import { useEffect, useMemo } from "react";
import { useStore } from "../context/StoreProvider";

export default function LandingPage() {

    const {userInfo, fetchUserInfo, isLoading} = useStore();
    const navigation = useNavigate()
    
    useEffect(() => {
        fetchUserInfo()
    }, []);

    useEffect(() => {
        if(!localStorage.getItem('token')) return
        if(userInfo.role) navigation('/home')
    }, [userInfo])

    return isLoading ? null : (
        <div className="flex items-center justify-center flex-col gap-5 bg-slate-900 p-10 rounded-lg shadow-lg sm:w-auto text-indigo-300 text-sm" >
            <div className="text-4xl flex items-center justify-center"><div className="size-50 "><img src="./logo.svg"/></div>Welcome to Task Manager</div>
            <div className="flex items-center gap-5">
                <Link to={'/login'} >
                    <Button bg>
                        Have a account
                    </Button>
                </Link>

                <Link to={'/sign-up'} >
                    <Button bg >
                        Get a account
                    </Button>
                </Link>
            </div>
        </div>
    )
}