import axios from 'axios';

const BASE_URL='http://172.20.10.2:8080';

const instance=axios.create({
    baseURL:BASE_URL,
    timeout:3000
});


instance.interceptors.request.use(
    config=>{
        /* console.log(userStore.token); 
         if(userStore.token){
            config.headers.Authorization=`Bearer ${userStore.token}`;
            /* config.headers.token=`Bearer ${userStore.token}`; 
        } 
         console.log('Request Headers:', config.headers); 
         */
        config.headers['Content-Type']='application/json';
        return config;
    },
    error=>{
        console.error('请求失败',error);
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response=>response,
    error=>{
        console.error('响应失败',error);
        if(error.code==='ERR_NETWORK'){
            console.error('网络连接错误');
        }
        if(error.response&&error.response.status===401){
            console.error('访问未授权');
        }
        return Promise.reject(error);
    }
);

async function request(method,url,data={}){
    try{
        let response;
        if(method==='GET'){
            response=await instance.get(url,{params:data});
        }
        else if(method==='POST'){
            response=await instance.post(url,data);
        }
        else if(method==='PUT'){
            response=await instance.put(url,data);
        }
        else if(method==='DELETE'){
            response=await instance.delete(url,{data});
        }
        return response;
    }
    catch(error){
        console.error('请求失败',error);
        throw new Error('请求失败'+error.message);
    }
}

export default instance;
export {request};