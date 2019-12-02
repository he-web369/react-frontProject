/*
包含多个reducer函数：根据老的state和指定的action返回新的state
 */
import {combineReducers} from 'redux'

function xxx(state=0,action) {
    return state
}
function yyy(state=0,action) {
    return state
}
export default combineReducers({
    xxx,
    yyy
})
