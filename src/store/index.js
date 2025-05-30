import {defineStore} from 'pinia';

export const useUserStore=defineStore('user',{
    state:()=>({
        id:'0',
        account:'',
        name:'游客',
        password:'',
        userRole:'学生',
        signature:'',
        hobbies:'',
        sex:'1',
        email:'example@example.com',
        phone:'1234567890',
        userAvatar:'../assets/img/userimg.png',
        isRegister:false,
        cur_component:'auth',
        currentTeamId:'',
        cur_module:0,
        proIsActive:1,
        searchString:''
    }),
    actions:{
        switchToReg(){
            this.isRegister=!this.isRegister
        },
        switchToLog(){
            this.isRegister=!this.isRegister
        },
        handleLogin(value){
            this.account=value.account;
            this.password=value.password;
            this.role=value.role;
            this.id=value.userId;
            this.hobbies=value.hobbies;
            this.signature=value.signature;
            this.email=value.email;
            this.phone=value.phone;
            if(value.role==='学生')this.cur_component='student';
            else if(value.role==='教师')this.cur_component='teacher';
        },
        handleLogout(){
            this.cur_component='auth';
            this.cur_module=0;
            this.id='0',
            this.account='',
            this.name='游客',
            this.password='',
            this.userRole='学生',
            this.signature='',
            this.hobbies='',
            this.sex='1',
            this.email='example@example.com',
            this.phone='1234567890',
            this.userAvatar='../assets/img/userimg.png'
        },
        changeActive(index){
            this.proIsActive=index
        },
        switchToSearchDetails(value){
            this.searchString=value,
            this.cur_module=5
        },
        updateUserInfo(value){
            this.id=value.userId;
            this.account=value.account;
            this.name=value.userName;
            this.password=value.password;
            this.userRole=value.role;
            this.signature=value.signature;
            this.hobbies=value.hobbies;
            this.sex=value.sex;
            this.email=value.email;
            this.phone=value.phone;
        }
    }
})