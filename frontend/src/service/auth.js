import { BASE_URL } from "../../env";

export async function login(data){
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            'content-type': "application/json",
        },
        body: JSON.stringify(data)
    })

    if(!res.ok) return {msg: "Require fail"}

    return await res.json();
}



export async function SignUp(data){
    const res = await fetch(`${BASE_URL}/auth/sign-up`, {
        method: "POST",
        headers: {
            'content-type': "application/json",
        },
        body: JSON.stringify(data)
    })

    if(!res.ok) return {msg: "Require fail"}

    return await res.json();
}