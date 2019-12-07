/*
包含多个reducer函数：根据老的state和指定的action返回新的state
 */
import {combineReducers} from 'redux'
import {ERROR_MSG,
    AUTH_SUCCESS,
    RESET_USER,RECEVE_USER,
    RECEIVE_USERLIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
    MSG_READ
} from "./aciton-types"
import {getRedirectTo} from '../utils/index'

const initUser={
    username:'',
    type:'',
    msg:'',
    redirectTo:''
}
function user(state=initUser,action) {
    switch (action.type) {
        case ERROR_MSG:
            return {...state,msg: action.data}
        case AUTH_SUCCESS:
            const {type,header}=action.data
            return {...action.data,redirectTo:getRedirectTo(type,header)}//成功去主界面
        case RESET_USER:
            return {...initUser,msg: action.data}
        case RECEVE_USER:
            return action.data
        default:
            return state
    }
}
const initUserList=[]
function userList(state=initUserList,action) {
    switch (action.type) {
        case RECEIVE_USERLIST:
            return action.data
        default:
            return state
    }
}
//产生聊天状态的reducers
const initChat={
    usersContainer:{},//所有用户信息的对象
    chatMsgs:[],//当前用户所有相关msg的数组
    unReadCount:0 //总的未读数量
}
function chat(state=initChat,action) {
    switch (action.type) {
        case RECEIVE_MSG:
            const {userid,chatMsg}=action.data
            return {usersContainer:state.usersContainer,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount: state.unReadCount+(!chatMsg.read&&chatMsg.to===userid?1:0)}
        case RECEIVE_MSG_LIST:
            const {usersContainer,chatMsgs}=action.data
            return {usersContainer,chatMsgs,unReadCount: chatMsgs.reduce((preTotal,msg)=>{
                   const {userid}=action.data
                   return  preTotal+(!msg.read&&msg.to===userid?1:0)
                },0)}
        case MSG_READ:
            const {from,to,count}=action.data
            return {
                usersContainer: state.usersContainer,
                chatMsgs: state.chatMsgs.map(item=>{
                    if(item.from===from&&!item.read&&item.to===to){
                        return {...item,read:true}
                    }else{
                        return item
                    }
                }),
                unReadCount: (state.unReadCount-count)
            }
        default:
            return state
    }
}
export default combineReducers({
    user,userList,chat
})
