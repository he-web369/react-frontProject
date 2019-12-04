/*
包含多个action creator
 */
import {reqRegister,reqLogin,reqUpdate,reqUser}  from '../api/index'
import {AUTH_SUCCESS,ERROR_MSG,RECEVE_USER,RESET_USER} from "./aciton-types"

const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})
const receiveUser=(user)=>({type:RECEVE_USER,data:user})
const resetUser=(msg)=>({type:RESET_USER,data:msg})

export const register=(user)=>{
    const {username,password,passwordAgain,type}=user
    if(!username){
        return errorMsg('用户名必须指定')
    }else if(password!==passwordAgain){
        return errorMsg('确认密码错误')
    }else if(!password){
        return errorMsg('密码必须指定')
    }
    return async dispatch=>{
       const res= await reqRegister({username,password,type})
        const result=res.data
        if(result.code===0){
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}
export const login=(user)=>{
    const {username,password}=user
    if(!username){
        return errorMsg('用户名必须指定')
    }else if(!password){
        return errorMsg('密码必须指定')
    }
    return async dispatch=>{
       const res= await reqLogin(user)
        const result=res.data
        if(result.code===0){
            dispatch(authSuccess(result.data))
        }else{
            dispatch(errorMsg(result.msg))
        }
    }
}
//更新用户异步action
export const updateUser=(user)=>{
    return  async dispatch=>{
        const response= await reqUpdate(user)
        const result=response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}
//获取用户异步action
export const getUser=()=>{
    return async dispatch=>{
        const response=await reqUser()
        const result=response.data
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}