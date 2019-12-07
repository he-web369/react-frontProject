/*
个人信息中心界面路由容器组件
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Button,Modal} from "antd-mobile";
import Cookies from 'js-cookie'

import {resetUser} from '../../redux/actions'

const Item=List.Item
const Brief=Item.Brief
class Personal extends Component{

    handleClick=()=>{
        Modal.alert('退出','确认退出登录吗',[
            {text:'取消'},
            {
                text:'确定',
                onPress:()=>{
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            }
        ])
    }
    render(){
        const {header,username,company,post,personalInfo,salary,type}=this.props.user
        return (
            <div style={{marginBottom:50,marginTop:50}}>
                <Result img={<img alt='头像' src={require(`../../assets/images/${header}.png`)} style={{width:50}}/>}
                        title={username}
                        messaage={company}
                />
                <List renderHeader={()=>'相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <WhiteSpace/>
                        <Brief>{type==='laoban'?'薪资':'期望薪资'}：{salary}</Brief>
                        <WhiteSpace/>
                        <Brief >{type==='laoban'?'招聘简介':'个人简介'}：{personalInfo}</Brief>
                        <WhiteSpace/>
                    </Item>
                </List>
                <List>
                    <Button type='warning' onClick={this.handleClick}>退&nbsp;出&nbsp;登&nbsp;录</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {resetUser}
)(Personal)