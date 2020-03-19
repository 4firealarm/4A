import axios from 'axios'
// import { useCookies } from 'react-cookie';
const requestList:any = []  // 请求列表
const CancelToken = axios.CancelToken // 取消列表
const instance = axios.create()
let sources:any = {}

// let loadingInstance:boolean     // 加载全局的loading
instance.defaults.timeout = 10000 //超时取消请求

instance.interceptors.request.use((config) => {
  // const [cookies] = useCookies(['4A']);
  // console.log('cookies:' + cookies)
  //将请求地址及参数作为一个完整的请求
  const request:string = JSON.stringify(config.url) + JSON.stringify(config.data)
  config.cancelToken = new CancelToken((cancel) => {
    sources[request] = cancel
  })
  //1.判断请求是否已存在请求列表，避免重复请求，将当前请求添加进请求列表数组；
  if(requestList.includes(request)){
    sources[request]('取消重复请求')
  }else{
    requestList.push(request)
    //2.请求开始，改变loading状态供加载动画使用
    // store.dispatch('changeGlobalState', {loading: true})
  }
  //3.从cookies中获取token并添加到请求头供后端作权限校验
  // if (cookies) {
  //   config.headers.Authorization = cookies
  // }
  return config
},(err) => {
  return Promise.reject(err)
})

instance.interceptors.response.use((response)=> {
  // 1.将当前请求中请求列表中删除
  const request = JSON.stringify(response.config.url) + JSON.stringify(response.config.data)
  requestList.splice(requestList.findIndex((item:any) => item === request), 1)
  // 3.统一处理权限认证错误管理
  if ([1102, 1101].includes(response.data.code)) {
   // TODO:
  }
  return response
},(err) => {
  // 4.处理取消请求
  if (axios.isCancel(err)) {
    requestList.length = 0
    // 可添加关闭loading事件
    throw new axios.Cancel('cancel request')
  } else {
    // TODO:处理网络请求失败
    // window.ELEMENT.Message.error('网络请求失败', 1000)
  }
  return Promise.reject(err)
})

interface RequestConfig {
  name?:string,  
  url:string,    
  params:object,
  method:string
}
const request =  (config:RequestConfig) => {
  const url:string = config.url
  const method:string = config.method.toLowerCase()
  let params = config.params

  if ((config.method === 'get' || config.method === 'delete') && params) {
    params = { params }
  }

  return instance.bind(method)(url, params)
    .then((response:any) => {
      // isNotPro &&
      //   config.showTime &&
      //   console.timeEnd(`${config.name}【${config.showTime}】`)
      return Promise.resolve(response)
    })
    .then(handleResponse)
    .catch((error: any) => {
      return Promise.reject(error)
    })
}

/* 对response进行统一的处理 */
const handleResponse = (response:any) => {
  // 判断结果是否正确.提取复用.并直接返回结果（data.data）
  // TODO:需要根据情况返回
  // if (response.data.code === 0) {
  //   return response.data.data
  // }

  // 如果报错.统一在这里toast提示（如果设置了showError为false，则不展示错误）
  // const error = response.data.message
  // const noErrorArr = config.noErrorArr || []

  // const isInNoArr = noErrorArr.includes(response.data.code)

  // !isInNoArr && config.showError !== false && error && that.$Message.error(error)

  // console.log('❌%c【%s】', 'color: red', config.name || '-', error, { config })

  return Promise.reject(response.data) // 返回接口返回的错误信息
}

export default request

