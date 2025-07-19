import { Link, useNavigate } from "react-router-dom";
import Button from "../components/elements/Button";
import { InputText } from "../components/elements/Input";
import { useEffect, useMemo, useState } from "react";
import { SignUp } from "../service/auth";
import { useStore } from "../context/StoreProvider";

export default function SignUpPage() {

    const navigation = useNavigate();
    const {fetchUserInfo, userInfo} = useStore();

    const [isLoading, setLoading] = useState(false);
    const [errorMSg, setErrorMsg] = useState({name: '', username: '', password: "", res: ''});

    function setError(key, val) {
        setErrorMsg(old => ({...old, [key]:val}))
    }

    async function handleForm(e) {
        e.preventDefault();
        const {username, password, name} = Object.fromEntries(new FormData(e.target));
        if(!(username && password && name)){
            if(!name) setError('name', 'Full Name is reuired')
            if(!username) setError('username', 'username is required')
            if(!password) setError('password', 'password is required')
            return;
        };

        if(password.length < 8) {
            setError('password', 'password is to short')
            return;
        }

        if(username.includes(' ')) {
            setError('username', 'empty space is not allow in username')
            return;
        }

        setLoading(true);
        let res = await SignUp({username, password, name});
        setLoading(false);

        if(res.token) {
            localStorage.setItem('token', res.token);
            fetchUserInfo();
            return navigation('/home')
        }

        setError('res', res.msg)
    }

    useEffect(() => {
        fetchUserInfo()
    }, [])

    useEffect(() => {
        if(!localStorage.getItem('token')) return
        if(userInfo.role) navigation('/home')
    }, [userInfo])

    return (
        <div className="flex items-center justify-center  bg-slate-900 p-10 rounded-lg shadow-lg sm:w-auto text-indigo-300 text-sm" >
            <form onSubmit={handleForm} className="max-w-[500px] w-full flex flex-col gap-2 items-center" >
                <div className="text-2xl mb-5">Sign-Up</div>
                
                <div className="flex flex-col gap-5 w-full " >
                    <div className="w-full" >
                         <InputText
                            name="name" 
                            label="Full Name" 
                            placeholder="fullname" 
                            errorMsg={errorMSg.name} 
                            onChange={() => {
                                if(errorMSg.name) setError('name', '');
                                if(errorMSg.res) setError('res', '')
                            }} 
                        />
                    </div>

                    <div className="w-full" >
                         <InputText 
                            name="username" 
                            label="Username" 
                            placeholder="username" 
                            errorMsg={errorMSg.username} 
                            onChange={() => {
                                if(errorMSg.username) setError('username', '');
                                if(errorMSg.res) setError('res', '')
                            }} 
                        />
                    </div>

                    <div className="w-full" >
                        <InputText
                            name="password" 
                            label="Password" 
                            placeholder="************" 
                            errorMsg={errorMSg.password} 
                            onChange={() => {
                                if(errorMSg.password) setError('password', '');
                                if(errorMSg.res) setError('res', '')
                            }}
                        />
                    </div>

                    <div className="w-full flex flex-col gap-2" >
                        <p className="text-center text-red-500 text-sm">{errorMSg.res}</p>
                        <Button isLoading={isLoading} className="flex-1" bg>Sign Up</Button>
                    </div>
                </div>
                
                <div className="text-sm" >Already have account ? <Link to={'/login'} className="text-blue-500" >login</Link></div>
            </form>
        </div>
    )
}