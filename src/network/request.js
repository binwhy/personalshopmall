//我们在开发中可能需要创建多个实例 所以导出时不要用 export default

import  axios from 'axios'

//instance本身就是返回一个promise
export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  //2.axios的拦截器 拦截请求和响应
  // axios.interceptors.request 拦截请求
  // axios.interceptors.response 拦截响应
  //这里我们是拦截instance 不是全局的axios 所以使用instance.interceptors.request
  //源码中可以看出 use有两个参数 都是函数
  //2.1请求拦截
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err);
  })

  //2.2响应拦截
  //也是两个参数
  instance.interceptors.response.use(res => {
    //我们拦截了 之后一定要返回出去 只要返回data就行了 data才是我们真正的数据
    return res.data
  },err =>{
    console.log(err);
  })


  //3.发送真正的网络请求
  return instance(config)
}
