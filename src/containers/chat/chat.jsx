/*
对话聊天的路由组件
 */
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from "antd-mobile";

import {sendMsg,hasReadMsg} from '../../redux/actions'

const Item=List.Item
class Chat extends Component{

    state={
        content:'',
        isShow:false//是否显示表情列表
    }

    constructor(props) {
        super(props);
        const emojis=['😊','😀','😅','😂','😇','🤑','🤔','🤪','😝','🤢','😴','😚','👪','💙'
            ,'👩‍👩‍👧‍👧','🧒', '👦', '👧','👿','😈','🤬','😠','😡','😤','😫','😩'
        ,'😓','😞','😖','😱','😭','😳','😮','☹','😵','🧒',]
        this.emojis=emojis.map(item=>({text:item}))
    }
    componentDidMount() {
        window.scrollTo(0,document.body.scrollHeight)
        //发请求更新消息的未读状态
        const from=this.props.match.params.userid
        const to=this.props.user._id
        this.props.hasReadMsg(from,to)
    }

    componentDidUpdate() {
        window.scrollTo(0,document.body.scrollHeight)
    }
    componentWillUnmount() {
        //退出之前
        const from=this.props.match.params.userid
        const to=this.props.user._id
        this.props.hasReadMsg(from,to)
    }

    toSend=()=>{
        const from=this.props.user._id
        const to=this.props.match.params.userid
        const content=this.state.content.trim()
        if(content){
            this.props.sendMsg({from,to,content})
        }
        this.setState({content:'',isShow:false})
    }
    toggleShow=()=>{
        let isShow=!this.state.isShow
        this.setState({isShow:isShow})
        if(isShow){
            setTimeout(()=>{
                window.dispatchEvent(new Event('resize'))
            },0)
        }
    }

    render(){
        const {user}=this.props
        const {usersContainer,chatMsgs}=this.props.chat
        const meId=user._id
        if(!usersContainer[meId]){
            return null
        }
        const targetId=this.props.match.params.userid
        //对chatMsgs进行过滤
        const msgs=chatMsgs.filter(item=>item.chat_id===[meId,targetId].sort().join('_').trim())
        const targetHeader=usersContainer[targetId].header
        const targetIcon=targetHeader?require(`../../assets/images/${targetHeader}.png`):null
      return (
            <div id='chat-page'>
                <NavBar onLeftClick={()=>this.props.history.goBack()}
                    icon={<Icon type='left' />}
                    className='stick-top'>{usersContainer[targetId].username}</NavBar>
                    <List style={{marginTop:45,marginBottom:50}} >
                            {
                                msgs.map((item)=>{
                                    if(meId===item.to){
                                        return (
                                            <Item key={item._id}
                                                  thumb={targetIcon}>
                                                {item.content}</Item>
                                        )
                                    }else{
                                        return (<Item key={item._id}
                                                      className='chat-me'
                                                      extra='我'
                                        >{item.content}</Item>)
                                    }
                                })
                            }
                    </List>
                <div className='am-tab-bar'>
                    <InputItem placeholder='请输入' extra={
                                    <span>
                                        <span onClick={this.toggleShow} style={{marginRight:5}}>{'🙂'}</span>
                                        <span onClick={this.toSend}>发送</span>
                                    </span>
                                }
                               onChange={value=>this.setState({content:value})}
                               value={this.state.content}
                               onFocus={()=>this.setState({isShow:false})}
                    />
                    {this.state.isShow?(
                        <Grid data={this.emojis}
                              columnNum={8}
                              carouselMaxRow={4}
                              isCarousel={true}
                              onClick={(item)=>{
                                  this.setState({content:this.state.content+item.text})
                              }}
                        />
                    ):null}
                </div>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user,chat:state.chat}),
    {sendMsg,hasReadMsg}
)(Chat)