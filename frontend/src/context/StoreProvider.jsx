import { createContext, useContext, useState } from "react";
import { getAllUsers, getUser } from "../service/user";
import { assignTask, deleteTask, getAllAssignTasks, getAllTasks, updateTask } from "../service/task";

const StoreContext = createContext();

export default function StoreProvider({children}){

    const [userInfo, setUserInfo] = useState({});
    const [tasks, setTasks] = useState([]);
    const [assignTasks, setAssignTasks] = useState([]);
    const [allUsers, setAllUsers] = useState([])

    const [loading, setLoading] = useState(false);

    function fetchUserInfo() {
        setLoading(true);
        getUser().then(res => {
            if(res.user) setUserInfo(res.user);
            setLoading(false);
        })
    }

    function fetchAllTasks() {
        setLoading(true);
        getAllTasks().then(res => {
            setTasks(res.tasks ?? []);
            setLoading(false);
        })
    }

    function fetchAllUsers() {
        getAllUsers().then(res => {
            setAllUsers(res.users ?? [])
        })
    }

    function fetchAssignTasks() {
        setLoading(true)
        getAllAssignTasks().then(res => {
            setAssignTasks(res.tasks ?? [])
            setLoading(false)
        })
    }

    function deleteTaskById(id) {
        setLoading(true);
        return new Promise(resolve => {
            deleteTask(id).then(res => {
                if(res) fetchAssignTasks();
                setLoading(false)
                resolve(res)
            })
        })
    }
    
    function updateTaskById(id, data) {
        setLoading(true);
        return new Promise(resolve => {
            updateTask(id, data).then(res => {
                if(res) fetchAssignTasks();
                setLoading(false)
                resolve(res)
            })
        })
    }

    const states = {
        userInfo, tasks, loading, allUsers, assignTasks,
        setUserInfo,
        fetchUserInfo,
        fetchAllTasks,
        fetchAllUsers,
        fetchAssignTasks,
        deleteTaskById,
        updateTaskById
    }

    return (
        <StoreContext.Provider value={states} >
            {children}
        </StoreContext.Provider>
    )
}


export function useStore() {
    return useContext(StoreContext)
}