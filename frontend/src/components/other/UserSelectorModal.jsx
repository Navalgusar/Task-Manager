import { useEffect, useState } from "react";
import { useStore } from "../../context/StoreProvider";
import CenterModal from "../layout/CenterModal";
import { FiChevronRight, FiUser } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

export default function UserSelectorModal({visible, setVisible, user, setUser}) {
    const {allUsers, fetchAllUsers} = useStore()
    
    const [users, setUsers] = useState(allUsers ?? []);

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
            <div 
                className="rounded-lg bg-blue-400 w-full p-2 flex items-center justify-between gap-2 cursor-pointer text-white" 
            >
                <div className="flex gap-2 items-center">
                    <div className="bg-zinc-900 flex items-center justify-center rounded-sm aspect-square min-w-10 ">
                        <FiUser className=" size-6" />
                    </div>
                    
                    <div className="flex flex-col">
                        <div className="text-sm text-left">{user.name  ?? 'Select User'}</div>
                        <p className="text-xs opacity-70" >
                            {user.role ?? 'Select user that you want to assign task'}
                        </p>
                    </div>
                </div>

                <div className="text-semibold text-sm">{user.role ? 'Selected' : ''}</div>
            </div>

            <label className="px-5 h-10 shrink-0 rounded-lg bg-zinc-800 flex items-center gap-4">
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
                        <button 
                            key={item._id} 
                            className="rounded-lg bg-zinc-800 w-full px-5 h-10 flex items-center justify-between shrink-0" 
                            onClick={() => {
                                setUser(item);
                                setVisible(false);
                            }}
                        >
                            <div>{item.name}</div>
                            <div className="opacity-80 flex items-center gap-1">
                                <div>{item.role}</div>
                                <FiChevronRight/>
                            </div>
                        </button>
                    ))
                }
            </div>
        </CenterModal>
    )
}