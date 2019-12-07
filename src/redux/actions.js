/*
包含多个action creator
 */
import {reqRegister, reqLogin, reqUpdate, reqUser, reqUserList,reqChatMsgList,reqReadMsg} from '../api/index'
import {MSG_READ,AUTH_SUCCESS,ERROR_MSG,RECEVE_USER,RESET_USER,RECEIVE_USERLIST,RECEIVE_MSG_LIST,RECEIVE_MSG} from "./aciton-types"
import io from 'socket.io-client'


const authSuccess=(user)=>({type:AUTH_SUCCESS,data:user})
const errorMsg=(msg)=>({type:ERROR_MSG,data:msg})
const receiveUser=(user)=>({type:RECEVE_USER,data:user})
export const resetUser=(msg)=>({type:RESET_USER,data:msg})
const receiveUserList=(userList)=>({type:RECEIVE_USERLIST,data:userList})
const receiveMsgList=({usersContainer,chatMsgs,userid})=>({type:RECEIVE_MSG_LIST,data:{usersContainer,chatMsgs,userid}})
const receiveMsg=({userid,chatMsg})=>({type:RECEIVE_MSG,data:{userid,chatMsg}})
const msgRead=({from,to,count})=>({type:MSG_READ,data:{from,to,count}})

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
            getMsgList(dispatch,result.data._id)
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
            getMsgList(dispatch,result.data._id)
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
//获取用户信息异步action
export const getUser=()=>{
    return async dispatch=>{
        const response=await reqUser()
        const result=response.data
        if(result.code===0){
            getMsgList(dispatch,result.data._id)
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
}
//获取用户列表异步action
export const getUserList=(type)=>{
    return async dispatch=>{
        const response=await  reqUserList(type)
        const result=response.data
        if(result.code===0){
            dispatch(receiveUserList(result.data))
        }
    }
}
//异步发送消息的异步action
/*
单例对象
 */
function initIO(dispatch,userid){
    if(!io.socket){
        io.socket=io('ws://localhost:4000')
        io.socket.on('receiveMsg',function (chatMsg) {
            if(userid===chatMsg.from||userid===chatMsg.to){
                dispatch(receiveMsg({userid,chatMsg}))
            }
        })
    }
}
export const sendMsg=({from,to,content})=>{
    return async dispatch=>{
        io.socket.emit('sendMsg',{from,to,content})
    }
}
//异步获取消息列表数据
async function  getMsgList(dispatch,userid){
    initIO(dispatch,userid)
    const response= await reqChatMsgList()
    const result=response.data
    if(result.code===0){
        const {usersContainer,chatMsgs}=result.data
        dispatch(receiveMsgList({usersContainer,chatMsgs,userid}))
    }
}
//读取消息的异步action
export  function hasReadMsg(from,to){
    return async dispatch=>{
       const response= await reqReadMsg(from)
        const result=response.data
        if(result.code===0){
            const count=result.data
            dispatch(msgRead({from,to,count}))
        }
    }
}