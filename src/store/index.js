import {defineStore} from 'pinia';

export const useUserStore=defineStore('user',{
    state:()=>({
        name:'游客',
        password:'123456',
        id:'0',
        userRole:'学生',
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