/*
包含了多个接口请求函数的模块
 */
import ajax from "./ajax";

export  const  reqRegister=(user)=>ajax('/register',user,'POST')
export  const  reqLogin=(user)=>ajax('/login',user,'POST')
export  const  reqUpdate=(user)=>ajax('/update',user,'POST')
export  const  reqUser=()=>ajax('/user')
export  const  reqUserList=(type)=>ajax('/userlist',{type})
export  const  reqChatMsgList=()=>ajax('/msglist')
export  const  reqReadMsg=(from)=>ajax('/readmsg',{from},'POST')