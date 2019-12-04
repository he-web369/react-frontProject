/*
包含多个reducer函数：根据老的state和指定的action返回新的state
 */
import {combineReducers} from 'redux'
import {ERROR_MSG,AUTH_SUCCESS,RESET_USER,RECEVE_USER} from "./aciton-types"
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

export default combineReducers({
    user
})
