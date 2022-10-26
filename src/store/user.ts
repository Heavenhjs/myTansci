import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id:'user', //id唯一且必须
    state:()=>{
        return {
            username:'',
            password:'',
            loginTime: '',
        }
    },
    actions:{
        setUser(data: { username: string; password: string; loginTime: string; }){
            this.username = data.username;
            this.password = data.password;
            this.loginTime = data.loginTime;
        },
        updateName(name: string){
            this.username = name;
            console.log(this.username);
        },
        updatePassword(password: string){
            this.password = password;
        }
    }
})