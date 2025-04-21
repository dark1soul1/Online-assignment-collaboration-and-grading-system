import {defineStore} from 'pinia';

export const useUserStore=defineStore('user',{
    state:()=>({
        id:'0',
        account:'123456',
        name:'游客',
        password:'123456',
        userRole:'学生',
        email:'example@example.com',
        phone:'1234567890',
        userAvatar:'../assets/img/userimg.png',
        isRegister:false,
        cur_component:'student',
        proIsActive:1
    }),
    actions:{
        switchToReg(){
            this.isRegister=!this.isRegister
        },
        switchToLog(){
            this.isRegister=!this.isRegister
        },
        handleLogout(){
            this.cur_component='auth'
        },
        changeActive(index){
            this.proIsActive=index
        }
    }
})