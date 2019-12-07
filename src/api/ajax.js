/*
能发送ajax请求的函数模块
函数的返回值是promise对象
 */
import axios from 'axios'

export  default  function ajax(url,data={},method='GET') {
        if (method==='GET'){
            let paramsStr=''
            Object.keys(data).forEach(key=>{
                paramsStr += key +'='+data[key]+'&'
            })
            if(paramsStr){paramsStr.substring(0,paramsStr.length-1)}
            return axios.get(url+'?'+paramsStr)
        }else{
            return  axios.post(url,data)
        }
}