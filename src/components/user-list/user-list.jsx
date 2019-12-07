/*
显示指定用户列表的UI组件
 */
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank,WhiteSpace,Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'


const Header=Card.Header
const Body=Card.Body
 class UserList extends Component{
    static propTypes={
        userList:   PropTypes.array.isRequired
    }
    render(){
        const {userList}=this.props
        return (
            <WingBlank style={{marginBottom:50,marginTop:50}}>
                    {
                        userList.map((item)=>
                            (
                                <div key={item._id}>
                                    <WhiteSpace/>
                                    <Card >
                                        <Header
                                            thumb={require(`../../assets/images/${item.header}.png`)}
                                            extra={item.username}
                                            onClick={()=>this.props.history.push(`/chat/${item._id}`)}
                                        />
                                        <Body>
                                            <div>职位：{item.post}</div>
                                            {item.type==='laoban'?<div>公司：{item.company}</div>:null}
                                            <div>{item.type==='laoban'?'月薪':'期望月薪'}：{item.salary}</div>
                                            <div>{item.type==='laoban'?'岗位要求':'个人介绍'}：{item.personalInfo}</div>
                                        </Body>
                                    </Card>
                                </div>
                            ))
                    }
            </WingBlank>
        )
    }
}
export default withRouter(UserList)
