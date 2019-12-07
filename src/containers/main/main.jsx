import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import  Cookies from 'js-cookie' //可以操作前端cookie的对象
import {NavBar} from "antd-mobile";

import LaobanInfo from '../laoban-info/laoban-info'
import DashenInfo from '../dashen-info/dashen-info'
import {getRedirectTo} from '../../utils/index'
import {getUser} from '../../redux/actions'
import  DaShen from '../dashen/dashen'
import  Laoban from '../laoban/laoban'
import Message  from '../message/message'
import  Personal from '../personal/personal'
import  NotFound  from '../../components/not-found/not-found'
import NavFooter from "../../components/nav-footer/nav-footer";
import Chat from '../chat/chat'

class Main extends Component{
    navList=[
        {
            path:'/laoban',
            component:Laoban,
            title:'大神列表',
            icon:'laoban',
            text:'老板'
        },
        {
            path:'/dashen',
            component:DaShen,
            title:'老板列表',
            icon:'dashen',
            text:'大神'
        },
        {
            path:'/message',
            component:Message,
            title:'消息列表',
            icon:'message',
            text:'消息'
        },
        {
            path:'/personal',
            component:Personal,
            title:'个人信息',
            icon:'personal',
            text:'个人'
        }
    ]
    componentDidMount() {
        const userId=Cookies.get('userid')
        const {_id}=this.props.user
        if(userId&&!_id){
            this.props.getUser()
        }
    }
    render(){
        // const {user}=this.props
        // if(!user._id){
        //   return  <Redirect to='/login'/>
        // }
        //读取cookie中的userid
            const userId=Cookies.get('userid')
        //没有userID，自动重定向到登录界面
            if(!userId){
                return <Redirect to='/login' />
            }
        //有userID，读取redux中的user状态
            const {user}=this.props
        //如果user没有_id，返回null
            if(!user._id){
                return null
            }else{
                //如果有_id，显示对应的界面
                //如果请求根路径，根据user的type和header来计算出一个重定向的路由路径，并自动重定向
                let path=this.props.location.pathname
                if(path==='/'){
                    path = getRedirectTo(user.type,user.header)
                    return <Redirect to={path}/>
                }
            }
            const {navList}=this
            const path=this.props.location.pathname//请求的路径
            const currentNav=navList.find(nav=>nav.path===path)//得到当前的nav
            if(currentNav){
                if(user.type==='laoban'){
                    navList[1].hide=true
                }else{
                    navList[0].hide=true
                }
            }
        const unReadCount = this.props.unReadCount
        return (
            <div>
                {currentNav?<NavBar className='stick-top'>{currentNav.title}</NavBar>:null}
                <Switch>
                        <Route path='/laobaninfo' component={LaobanInfo}/>
                        <Route path='/dasheninfo' component={DashenInfo}/>
                        <Route path='/chat/:userid' component={Chat}/>
                        {navList.map((nav,index)=><Route key={index} path={nav.path} component={nav.component}/>)}
                        <Route  component={NotFound}/>
                </Switch>
                {currentNav?<NavFooter unReadCount={unReadCount} navList={this.navList}/>:null}
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(Main)