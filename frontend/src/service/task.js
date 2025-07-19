import { BASE_URL } from "../../env";

export async function getAllTasks() {
    const res = await fetch(`${BASE_URL}/task/`, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token') ?? ''}`
        }
    })

    const data = await res.json();
    return data;
}

export async function getAllAssignTasks() {
    const res = await fetch(`${BASE_URL}/task/assign`, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token') ?? ''}`
        }
    })

    const data = await res.json();
    return data;
}



export async function getTask(id){
     const res = await fetch(`${BASE_URL}/task/${id}`, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token') ?? ''}`
        }
    })

    const {tasks} = await res.json();
    return tasks;
}



export async function deleteTask(id){
     const res = await fetch(`${BASE_URL}/task/${id}`, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token') ?? ''}`
        }
    })

    return res.ok;
}


export async function assignTask(data) {
    const res = await fetch(`${BASE_URL}/task`, {
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })

    return res.ok;
}


export async function updateTask(id, data) {
     const res = await fetch(`${BASE_URL}/task/${id}`, {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    })

    return res.ok;
}