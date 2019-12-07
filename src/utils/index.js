/*
工具函数的模块
 */

//返回对应的路由路径
export function getRedirectTo(type,header) {
    let path=''
    if(type==='dashen'){
        path='/dashen'
    }else{
        path='/laoban'
    }
    if(!header){
        path+='info'
    }
    return path
}