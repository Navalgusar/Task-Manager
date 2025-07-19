import { FiChevronRight, FiEdit2, FiInbox, FiTrash2, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import { useEffect, useState } from "react";
import LoadingModal from "./LoadingModal";
import { useStore } from "../../context/StoreProvider";
import CenterModal from "./CenterModal";
import { InputText } from "../elements/Input";
import Button from "../elements/Button";
import UserSelectorModal from "../other/UserSelectorModal";
import { getUserById } from "../../service/user";

export default function({tasks=[], useOpation=false}){
    
    const {isLoading, deleteTaskById} = useStore();
    const navigation = useNavigate();

    const [taskInfo, setTaskInfo] = useState({});

    const [isUpdateModalVisible, setUpdateModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteMdoalVisible] = useState(false);

    function handleDelete() {
        deleteTaskById(taskInfo._id).then(_ => {setDeleteMdoalVisible(false)})
    }

    return (
        tasks.length == 0 ? (
            <div className="w-full flex items-center justify-center flex-col">
                <FiInbox className="size-10" />
                <p className="text-2xl opacity-70" >
                    No Task
                </p>
                <p className="text-xs opacity-70" >
                    Currently You dont have any task
                </p>
            </div>
        ) : (
            <div className="w-full flex flex-col gap-6">
                {
                    tasks.map(item => (
                        <div key={item._id} className="flex flex-col items-center w-full gap-1" >
                            <div className="flex items-center justify-between w-full px-2">
                                <div className="self-start text-md opacity-80 font-semibold">{item.createOn?.split('T')[0]}</div>

                                {
                                    useOpation ? (
                                        <div className="flex items-center gap-4">
                                            <button 
                                                className="flex items-center gap-1 cursor-pointer opacity-70 hover:opacity-100 hover:text-shadow-[0_0_20px_white] duration-100 transition-all"
                                                onClick={() => {
                                                    setTaskInfo(item)
                                                    setUpdateModalVisible(true)
                                                }}
                                            >
                                                <div>edit</div>
                                                <FiEdit2/>
                                            </button>
                                            
                                            <button 
                                                className="flex items-center gap-1 text-red-500 cursor-pointer opacity-70 hover:opacity-100 hover:text-shadow-[0_0_20px_white] duration-100 transition-all"
                                                onClick={() => {
                                                    setTaskInfo(item)
                                                    setDeleteMdoalVisible(true)
                                                }}
                                            >
                                                <div>delete</div>
                                                <FiTrash2/>
                                            </button>
                                        </div>
                                    ) : null
                                }
                            </div>

                            <button 
                                onClick={() => {navigation(`/tasks/${item._id}`)}}
                                className="rounded-lg bg-slate-900 w-full px-5 py-1 flex items-center justify-between cursor-pointer" 
                            >
                                <div className="flex flex-col" >
                                    <div className="text-sm text-left">{item.title}</div>
                                    <div className="text-xs opacity-80 text-left" >
                                        {item?.description || 'have no discription'}
                                    </div>
                                </div>
                                
                                <FiChevronRight/>
                            </button>
                        </div>
                    ))
                }

                <UpdateTaskModal
                    visible={isUpdateModalVisible} setVisible={setUpdateModalVisible}
                    task={taskInfo}
                />

                <DeleteModal
                    visible={isDeleteModalVisible} setVisible={setDeleteMdoalVisible}
                    msg={'Once you delete task then no way to go back !!!'}
                    passKey={taskInfo.title}
                    handleDelete={handleDelete}
                />

                <LoadingModal isLoading={isLoading} />
            </div>
        )
    )
}


function UpdateTaskModal({visible, setVisible, task}) {

    const {updateTaskById} = useStore();

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
        updateTaskById(task._id, {title, description, assignTo: user._id}).then(res => {
            setLoading(false);
            setVisible(false);
        })
    }

    useEffect(() => {
        if(!task._id) return;
        getUserById(task.assignTo).then(res => {
            setUser(res.user ?? {})
        })
        console.log(task)
        setTitle(task.title ?? '');
        setDescription(task.description ?? '')
    }, [task])

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
                            <p className="text-xs opacity-70 text-left" >
                                {user.role || 'Click for select user to assign task'}
                            </p>
                        </div>
                    </div>

                    <FiChevronRight />
                </button>
                <p className="pl-2 text-xs text-red-500" >{error.user}</p>
            </div>

            <Button isLoading={isLoading} 
                onClick={() => {handleAssignTask();}}
            >Update</Button>
        
            <UserSelectorModal
                visible={isUserModalVisible} setVisible={setUserModalVisible}
                user={user} setUser={setUser}
            />
        </CenterModal>
    )
}
