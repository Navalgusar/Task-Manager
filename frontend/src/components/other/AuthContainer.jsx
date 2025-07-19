import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../../context/StoreProvider";



export default function AuthContainer({children}) {

    const navigation = useNavigate();
    const location = useLocation();
    const {fetchUserInfo, userInfo, isLoading} = useStore()

    useEffect(() => {
        if(!localStorage.getItem('token')){ 
            navigation('/');
            return;
        }
        fetchUserInfo()
    }, [location]);

    useEffect(() => {
        if(!userInfo.role) navigation('/')
    }, [userInfo])

    return (
        <>
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="border-10 size-20 rounded-full border-blue-200 border-t-blue-500 animate-spin" />
                </div>
            ) : children}
        </>
    )
}
