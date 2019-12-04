import React,{Component} from 'react'
import {Button, InputItem, List, NavBar, WhiteSpace, WingBlank} from "antd-mobile";
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import {login} from '../../redux/actions'
import Logo from "../../components/logo/logo";
class Login extends Component{
    state={
        username:'',
        password:''
    }
    login=()=>{
        this.props.login(this.state)
    }
    handleChange(name,val){
        this.setState({
            [name]:val
        })
    }
    toRegister=()=>{
        this.props.history.replace('/register')
    }
    render(){
        const {msg,redirectTo}=this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>
                    某&nbsp;某&nbsp;直&nbsp;聘
                </NavBar>
                <WhiteSpace/>
                <Logo/>
                <WhiteSpace/>
                <WingBlank>
                    <List>
                        {msg?<div className='error-msg'>{msg}</div>:null}
                        <InputItem placeholder='请输入用户名' onChange={val=>{this.handleChange('username',val)}}>用户名：</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type='password' onChange={val=>{this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace/>
                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>点击注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {login}
)(Login)