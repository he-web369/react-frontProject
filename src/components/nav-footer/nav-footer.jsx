/*
底部导航的UI组件
 */
import {TabBar} from 'antd-mobile'
import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

const Item= TabBar.Item
class NavFooter extends Component{

    static propTypes={
        navList: PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }
    render(){
        let {navList,unReadCount}=this.props
        navList=navList.filter(item=>!item.hide)
        return (
            <TabBar className='am-tab-bar'>
                {
                    navList.map((item)=>(
                        <Item key={item.path}
                              title={item.text}
                              icon={{uri:require(`./images/${item.icon}.png`)}}
                              selectedIcon={{uri:require(`./images/${item.icon}-selected.png`)}}
                              selected={item.path===this.props.location.pathname}
                              onPress={()=>this.props.history.replace(item.path)}
                              badge={item.path==='/message'?unReadCount:0}
                        />
                    ))
                }
            </TabBar>
        )
    }
}
export default withRouter(NavFooter)//向外暴露withRouter()包装产生的组件 方便使用路由组件特有的属性