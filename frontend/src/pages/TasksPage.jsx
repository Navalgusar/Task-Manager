import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Navbar from "../components/layout/Navbar";
import TaskTable from "../components/layout/TaskTable";
import { useStore } from "../context/StoreProvider";
import Button from "../components/elements/Button";
import CenterModal from "../components/layout/CenterModal";
import { InputText } from "../components/elements/Input";
import { FiUser, FiChevronRight } from "react-icons/fi";
import { assignTask } from "../service/task";
import UnderlineText from "../components/elements/UnderlineText";
import UserSelectorModal from "../components/other/UserSelectorModal";


export default function TasksPage() {

    const {tasks, fetchAllTasks, fetchUserInfo, userInfo, assignTasks, fetchAssignTasks} = useStore();

    const [isTaksModalVisible, setTaskModalVisible] = useState(false);
    const [onMyTasks, setOnMyTasks] = useState(true);

    useEffect(() => {
        fetchUserInfo()
        fetchAllTasks()

        if(userInfo.role !== 'user') fetchAssignTasks();
    }, [])

    return (
        <div className="w-full h-full items-center flex flex-col">
            <Navbar />

            <div className="w-full max-w-[1024px] mt-5 px-5 pb-10">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold">Tasks</h1>
                    {
                        userInfo.role !== 'user' ? (
                            <Button bg onClick={() => {setTaskModalVisible(true)}} >
                                Assign Task
                            </Button>
                        ) : null
                    }         
                </div>

                {
                    userInfo.role !== 'user' ? (
                        <div className="flex items-center gap-5 mt-2" >
                            <UnderlineText children={'My Tasks'} isActive={onMyTasks} 
                                onClick={() => {setOnMyTasks(true)}} 
                            />
                            <UnderlineText children={'Assign Tasks'} isActive={!onMyTasks} 
                                onClick={() => {setOnMyTasks(false)}}
                            />
                        </div>
                    ) : null
                }

                <label className="mb-10 mt-5 px-5 h-10 rounded-lg bg-slate-900 flex items-center gap-4">
                    <IoSearchOutline />
                    <input type="text" autoComplete={'false'} placeholder="Enter your query" 
                        className="outline-none flex-1 border-0"
                    />
                </label>

                <TaskTable tasks={(onMyTasks ? tasks : assignTasks) ?? []} useOpation={!onMyTasks} />
            </div>

            <TaskAssignModal
                visible={isTaksModalVisible} setVisible={setTaskModalVisible}
            />
        </div>
    )
}


function TaskAssignModal({visible, setVisible}) {

    const [isUserModalVisible, setUserModalVisible] = useState(false);
    
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({title: '', user: ''});
    
    const [user, setUser] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function setErrorMsg(key, val) {
        setError(err => ({
            ...err, [key]: val
        }))
    }

    function handleAssignTask() {
        let hasError = false;

        if(!title) {
            setErrorMsg('title', 'Task title is required !!!');
            hasError = true;
        }

        if(!user.role) {
            setErrorMsg('user', 'To assign task user must be required !!!');
            hasError = true;
        }

        if(hasError) return;

        setError({title: '', user: ''})
        assignTask({title, description, assignTo: user._id}).then(res => {
            setLoading(false);
            setVisible(false);
        })
    }

    return (
        <CenterModal
            visible={visible} setVisible={setVisible}
            title={'Assign Task'}
            containerClassName="max-w-[500px] w-full"
            className="gap-5 flex flex-col pt-5"
        >
            <InputText  
                label={'Title'}
                value={title}
                placeholder={'Enter Task Title'}
                errorMsg={error.title}
                onChange={(e) => {setTitle(e.target.value); setErrorMsg('title', '')}}
            />
            
            <InputText 
                value={description}
                label={'Description'}
                placeholder={'Enter task description'}
                onChange={(e) => {setDescription(e.target.value)}}
            />

            <div className="rounded-lg bg-slate-800 w-full px-5 h-10 flex items-center justify-between" >
                <div>Date</div>
                <div className="opacity-80">{new Date().toLocaleDateString()}</div>
            </div>
            <div>
                <button 
                    onClick={() => {setUserModalVisible(true); setErrorMsg('user', '')}}
                    className="rounded-lg bg-slate-800 w-full p-2 flex items-center justify-between gap-2 cursor-pointer" 
                >
                    <div className="flex gap-2 items-center">
                        <div className="bg-slate-900 flex items-center justify-center rounded-sm aspect-square min-w-10 ">
                            <FiUser className=" size-6" />
                        </div>
                        
                        <div className="flex flex-col">
                            <div className="text-sm text-left">{user.name ?? 'Select User'}</div>
                            <p className="text-xs opacity-70" >
                                {user.role ?? 'Click for select user to assign task'}
                            </p>
                        </div>
                    </div>

                    <FiChevronRight />
                </button>
                <p className="pl-2 text-xs text-red-500" >{error.user}</p>
            </div>

            <Button bg isLoading={isLoading} 
                onClick={() => {handleAssignTask();}}
            >Assign</Button>
        
            <UserSelectorModal
                visible={isUserModalVisible} setVisible={setUserModalVisible}
                user={user} setUser={setUser}
            />
        </CenterModal>
    )
}