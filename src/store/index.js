import {defineStore} from 'pinia';

export const useUserStore=defineStore('user',{
    state:()=>{
        isRegister:false
    },
    actions:{
        switchToReg(){
            this.isRegister=!this.isRegister
        },
        switchToLog(){
            this.isRegister=!this.isRegister
        }
    }
})