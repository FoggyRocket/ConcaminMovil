import {_retrieveData} from './userService';
//const baseUrl = 'https://concamin.herokuapp.com/posts/';
//const baseUrl = 'http://localhost:3000/posts/';
import { AsyncStorage } from "react-native"
const baseUrl = 'https://murmuring-beach-52120.herokuapp.com/posts'
let token;
export function getOwnPosts(skip=0){
    return fetch(baseUrl + `own/?skip=${skip}`,{
        headers:{
            "Authorization": retrieveToken()
        }
    })
        .then(res=>{
            if(!res.ok) return Promise.reject(res)
            return res.json();
        })
        .then(posts=>{
            return posts;
        })
        .catch(e=>console.log(e));
}

export async function addPost(post) {

        const token = await AsyncStorage.getItem('token')
        const form = new FormData();
        for(let key in post){
            form.append(key, post[key]);
        }
        console.log("fun",token)
        return fetch(baseUrl, {
            method:'post',
            body:form,
            //credentials:'include',
            headers:{
                "Authorization":token
            }
        })
            .then(res=>{
                if(!res.ok){
                    console.log(res);
                    return Promise.reject(res.json())
                }
                return res.json();
            })
            .then(post=>{
                return post;
            })




}


export async function getPosts(skip=0, tipo="PERSONAL", group, event){
    const token = await AsyncStorage.getItem('token')
    return fetch(baseUrl + `?skip=${skip}&tipo=${tipo}&group=${group}&event=${event}`, {
        headers:{
            "Authorization": token
        }
    })
        .then(res=>{
            if(!res.ok){
                console.log(res);
                return Promise.reject(res)
            }
            return res.json();
        })
        .then(posts=>{
            // if(posts.message){
            //     localStorage.removeItem('user');
            // }
            console.log(posts)
            return posts;
        })
}

export function getSinglePost(id){
    return fetch(baseUrl + id,{
        headers:{
            "Authorization": _retrieveData()
        }
    })
        .then(res=>{
            if(!res.ok){
                console.log(res);
                return Promise.reject(res)
            }
            return res.json();
        })
        .then(post=>{
            return post;
        });
}

export function updatePost(post){
    const form = new FormData();
    for(let key in post){
        form.append(key, post[key]);
    }
    return fetch(baseUrl + post._id, {
        method:'patch',
        body:form,
        headers:{
            "Authorization": _retrieveData()
        }
    })
        .then(res=>{
            if(!res.ok){
                console.log(res);
                return Promise.reject(res)
            }
            return res.json();
        })
        .then(post=>{
            return post;
        });
}

export function deletePost(id){
    return fetch(baseUrl + id, {
        method:'delete',
        headers:{
            "Content-Type":"application/json",
            "Authorization": _retrieveData()
        },
        //credentials:'include'

    })
        .then(res=>{
            if(!res.ok){
                console.log(res);
                return Promise.reject(res)
            }
            return res.json();
        })
        .then(posts=>{
            return posts;
        });
}

export function likePost(obj){
    return fetch(baseUrl+'like', {
        method:'PATCH',
        headers:{
            "Content-Type":"application/json",
            "Authorization": _retrieveData()
        },
        body:JSON.stringify(obj)
    }).then(res=>{
        if(!res.ok){
            return Promise.reject(res)
        }
        return res.json();
    }).then(item=>{
        return item
    })
}

