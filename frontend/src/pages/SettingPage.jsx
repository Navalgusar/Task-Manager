import Navbar from "../components/layout/Navbar";
import { MdDeleteForever } from "react-icons/md";
import { FiLogOut, FiUsers } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useStore } from "../context/StoreProvider";
import { FiChevronRight, FiUser, FiKey } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import CenterModal from "../components/layout/CenterModal";
import { InputText } from "../components/elements/Input";
import Button from "../components/elements/Button";
import { useNavigate } from "react-router-dom";
import { updatePassword, updateRole } from "../service/user";
import UnderlineText from "../components/elements/UnderlineText";

export default function SettingPage() {

    const navigation = useNavigate()
    const {fetchUserInfo, userInfo} = useStore();

    const [isInfoUpdateModalVisible, setInfoUpdateModalVisible] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [isUserInfoModalVisible, setUserInfoModalVisible] = useState(false);


    useEffect(() => {
        fetchUserInfo();
    }, [])
    

    return (
        <div className="w-full h-full items-center flex flex-col">
            <Navbar />

            <div className="flex flex-col py-5 px-5 sm:p-10 max-w-[1024px] w-full items-center gap-4 ">

                <div className="flex flex-col items-center w-full gap-3" >
                    <div className="self-start text-md pl-2 opacity-80 font-semibold">Persnal Information</div>

                    <div className="rounded-lg bg-slate-900 w-full px-5 h-10 flex items-center justify-between" >
                        <div>Name</div>
                        <div className="opacity-80">{userInfo.name}</div>
                    </div>
                
                    <div className="rounded-lg bg-slate-900 w-full px-5 h-10 flex items-center justify-between" >
                        <div>Position</div>
                        <div className="opacity-80">{userInfo.role}</div>
                    </div>
                   
                    <div className="rounded-lg bg-slate-900 w-full px-5 h-10 flex items-center justify-between" >
                        <div>Username</div>
                        <div className="opacity-80">{userInfo.username}</div>
                    </div>
                </div>
                
                <div className="flex flex-col items-center w-full gap-3" >
                    <div className="self-start text-md pl-2 opacity-80 font-semibold">Account Settings</div>

                    <button
                        onClick={() => {setInfoUpdateModalVisible(true)}}  
                        className="rounded-lg bg-slate-900 w-full p-2 flex items-center justify-between gap-2 cursor-pointer " 
                    >
                        <div className="flex gap-2 items-center">
                            <div className="bg-slate-800 flex items-center justify-center rounded-sm aspect-square min-w-10 ">
                                <FiUser className="size-6" />
                            </div>
                            
                            <div className="flex flex-col">
                                <div className="text-sm text-left">Update Information</div>
                                <p className="text-xs opacity-70" >Update your persnal information like name or username</p>
                            </div>
                        </div>

                        <FiChevronRight />
                    </button>
                    
                    <button 
                        onClick={() => {setPasswordModalVisible(true)}}
                        className="rounded-lg bg-slate-900 w-full p-2 flex items-center justify-between gap-2 cursor-pointer" 
                    >
                        <div className="flex gap-2 items-center">
                            <div className="bg-slate-800 flex items-center justify-center rounded-sm aspect-square min-w-10 ">
                                <FiKey className=" size-6" />
                            </div>
                            
                            <div className="flex flex-col">
                                <div className="text-sm text-left">Update Password</div>
                                <p className="text-xs opacity-70" >Replace your old password to new one</p>
                            </div>
                        </div>

                        <FiChevronRight />
                    </button>                    
                </div>
               
                <div className="flex flex-col items-center w-full gap-3" >
                    <div className="self-start text-md pl-2 opacity-80 font-semibold">Other</div>

                    {
                        userInfo.role === 'admin' ? (
                            <button 
                                onClick={() => {setUserInfoModalVisible(true)}}
                                className="rounded-lg bg-slate-900 w-full p-2 flex items-center justify-between gap-2 cursor-pointer" 
                            >
                                <div className="flex gap-2 items-center">
                                    <div className="bg-slate-800 flex items-center justify-center rounded-sm aspect-square min-w-10 ">
                                        <FiUsers className=" size-6" />
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <div className="text-sm text-left">Users Profile</div>
                                        <p className="text-xs opacity-70" >View and update users information</p>
                                    </div>
                                </div>

                                <FiChevronRight />
                            </button> 
                        ) : null
                    }
                
                    <button 
                        onClick={() => {
                            localStorage.removeItem('token');
                            navigation('/');
                        }}
                        className="rounded-lg bg-slate-900 w-full p-2 flex items-center gap-2 cursor-pointer " 
                    >
                        <div className="bg-slate-800 flex items-center justify-center rounded-sm aspect-square min-w-10 ">
                            <FiLogOut className="size-6" />
                        </div>
                        
                        <div className="flex flex-col text-left">
                            <div className="text-sm">Logout</div>
                            <p className="text-xs opacity-70" >Logout from your account</p>
                        </div>
                    </button>
                </div>

                <div className="flex flex-col items-center w-full gap-3" >
                    <div className="self-start text-md pl-2 opacity-80 text-red-500 font-semibold">Danger Zone</div>

                    <div className="rounded-lg bg-slate-900 w-full p-2 flex items-center gap-2 cursor-pointer " >
                        <div className="bg-slate-800 flex items-center justify-center rounded-sm aspect-square min-w-10 ">
                            <MdDeleteForever className="text-red-500 size-6" />
                        </div>
                        
                        <div className="flex flex-col text-red-500">
                            <div className="text-sm">Delete Account</div>
                            <p className="text-xs opacity-70" >Once you delete your account then no way to go back</p>
                        </div>
                    </div>
                </div>
            </div>

            <PersnalInfoUpdateModal
                visible={isInfoUpdateModalVisible} setVisible={setInfoUpdateModalVisible}
            />
            
            <PasswordUpdateModal
                visible={isPasswordModalVisible} setVisible={setPasswordModalVisible}
            />

            <UsersInfoModal 
                visible={isUserInfoModalVisible} setVisible={setUserInfoModalVisible}
            />
        </div>
    )
}


function PersnalInfoUpdateModal({visible, setVisible}) {
    
    const {userInfo} = useStore();

    function handleSubmit(e) {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.target))

        console.log(data)
    }

    return (
        <CenterModal 
            title={'Update Information'} 
            visible={visible}
            setVisible={setVisible}
            containerClassName="max-w-[600px] w-full"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-4">
                <InputText  
                    name="name"
                    value={userInfo.name}
                    label={'Full Name'}
                    placeholder={'Enter full Name'}
                />

                <InputText  
                    name="username"
                    value={userInfo.username}
                    label={'username'}
                    placeholder={'Enter username'}          
                />

                <Button bg >Update</Button>
            </form>
        </CenterModal>
    )
}


function PasswordUpdateModal({visible, setVisible}) {

    const [error, setError] = useState('');

    const data = useRef({oldPassword: '', newPassword: ''})


    function handlePasswordUpdate() {
        if(!data.current.oldPassword || !data.current.newPassword) {
            setError('Please fill all information');
            return ;
        }
        updatePassword(data.current).then(res => {
            if(res.ok) setVisible(false);
            setError('fail to update password')
        })
    }

    return (
        <CenterModal 
            title={'Update Password '} 
            visible={visible}
            setVisible={setVisible}
            containerClassName="max-w-[600px] w-full"
            className="flex flex-col gap-5 pt-4"
        >
            <InputText  
                label={'Current Password'}
                placeholder={'Enter full Name'}
                onChange={(e) => {data.current.oldPassword = e.target.value}}
            />
            
            <InputText  
                label={'New Password'}
                placeholder={'Enter username'}     
                onChange={(e) => {data.current.newPassword = e.target.value; setError('')}}
                errorMsg={error}     
            />

            <Button bg onClick={handlePasswordUpdate}>Update</Button>
        </CenterModal>
    )
}


function UsersInfoModal({visible, setVisible}) {
    const {allUsers, fetchAllUsers} = useStore()
    
    const [users, setUsers] = useState(allUsers ?? []);

    function handleUpdateRole({role, id}) {
        updateRole({id, role}).then(res => {
            if(res){
                setVisible(false);
                fetchAllUsers()
            }
        })
    }

    useEffect(() => {
        fetchAllUsers()
    }, []);

    useEffect(() => {
        setUsers(allUsers)
    }, [allUsers])

    return (
        <CenterModal
            visible={visible} setVisible={setVisible}
            title={'Select User'}
            containerClassName="max-w-[500px] max-h-[90vh] w-full flex flex-col"
            className="gap-5 flex flex-col pt-5 flex-1 relative overflow-hidden"
        >

            <label className="px-5 h-10 shrink-0 rounded-lg bg-slate-800 flex items-center gap-4">
                <IoSearchOutline />
                <input 
                    type="text" 
                    autoComplete={'false'} 
                    placeholder="Enter your query" 
                    className="outline-none flex-1 border-0"
                    onChange={(e) => {
                        setUsers(
                            allUsers.filter(item => item.name?.startsWith(e.target.value))
                        )
                    }}
                />
            </label>

            <div className="flex flex-col gap-1 w-full overflow-y-scroll pr-2">
                {
                    users?.map(item => (
                        <div 
                            key={item._id} 
                            className="rounded-lg bg-slate-800 w-full px-5 h-10 flex items-center justify-between shrink-0" 
                            onClick={() => {
                            }}
                        >
                            <div>{item.name}</div>
                            <div className="opacity-80 flex items-center gap-1">
                             
                                    <UnderlineText onClick={() => {handleUpdateRole({role: 'manager', id: item._id})}} 
                                    isActive={item.role == 'manager'} >manager</UnderlineText>

                                    <UnderlineText onClick={() => {handleUpdateRole({role: 'user', id: item._id})}}  
                                    isActive={item.role == 'user'} >user</UnderlineText>
                              
                            </div>
                        </div>
                    ))
                }
            </div>
        </CenterModal>
    )
}