import { BASE_URL } from "../../env";

export async function getUser() {
    let res = await fetch(`${BASE_URL}/user`, {
        method: 'GET',
        headers: {
            'content-type': "application/json",
            'authorization': `Bearer ${localStorage.getItem('token') ?? ''}`
        }
    })

    return await res.json();
}


export async function updatePassword(data) {
    let res = await fetch(`${BASE_URL}/user/update-password`, {
        method: 'POST',
        headers: {
            'content-type': "application/json",
            'authorization': `Bearer ${localStorage.getItem('token') ?? ''}`
        },
        body: JSON.stringify(data)
    })

    return (res.ok)
}



export async function updateInfo(data) {
    let res = await fetch(`${BASE_URL}/user/`, {
        method: 'PUT',
        headers: {
            'content-type': "application/json",
            'authorization': `Bearer ${localStorage.getItem('token') ?? ''}`
        },
        body: JSON.stringify(data)
    })

    if(res.ok) return;
}


export async function getAllUsers() {
    const res = await fetch(`${BASE_URL}/user/all`, {
        method: "GET",
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });

    const data = await res.json();
    return data;
}


export async function getUserById(id) {
    const res = await fetch(`${BASE_URL}/user/${id}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })

    return await res.json();
}


export async function updateRole(data) {
     let res = await fetch(`${BASE_URL}/user/role`, {
        method: 'PATCH',
        headers: {
            'content-type': "application/json",
            'authorization': `Bearer ${localStorage.getItem('token') ?? ''}`
        },
        body: JSON.stringify(data)
    })

    return (res.ok);
}