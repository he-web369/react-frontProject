/*
消息界面路由容器组件
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,Badge} from "antd-mobile";

const Item=List.Item
const Brief=Item.Brief
function getLastMsgs(chatMsgs,userid){
    const lastMsgObjs={}
    chatMsgs.forEach(msg=>{

        //给msg添加是否阅读属性
        if(msg.to===userid && !msg.read){
            msg.unReadCount=1
        }else{
            msg.unReadCount=0
        }
        const chatId=msg.chat_id
        const lastMsg=lastMsgObjs[chatId]
        if(!lastMsg){
            lastMsgObjs[chatId]=msg
        }else{
            const unReadCount=lastMsg.unReadCount
            //看create_time
            if(msg.create_time>lastMsg.create_time){
                lastMsgObjs[chatId]=msg
            }
            //累加未读信息数量
            lastMsgObjs[chatId].unReadCount=unReadCount+msg.unReadCount
        }
    })
    const lastMsgs=Object.values(lastMsgObjs)
    lastMsgs.sort(function (m1,m2) {
        return m2.create_time-m1.create_time
    })
    return lastMsgs
}
class Message extends Component{
    render(){
        const {user}=this.props
        const {usersContainer,chatMsgs}=this.props.chat
        const lastMsgs=getLastMsgs(chatMsgs,user._id)
        const meId=user._id
        return (
                <List style={{marginTop:45,marginBottom:50}}>
                    {
                        lastMsgs.map(msg=>{
                            const targetUserId=msg.from===meId?msg.to:msg.from
                            const targetUser=usersContainer[targetUserId]
                            return(
                        <Item extra={<Badge text={msg.unReadCount}/>}
                        thumb={targetUser.header?require(`../../assets/images/${targetUser.header}.png`):null}
                        arrow='horizontal'
                        key={msg._id}
                        onClick={()=>{
                            this.props.history.push(`/chat/${targetUserId}`)
                        }}
                        >{msg.content}
                        <Brief>{targetUser.username}</Brief>
                        </Item>
                        )})
                    }
                </List>
        )
    }
}
export default connect(
    state=>({user:state.user,chat:state.chat})
)(Message)