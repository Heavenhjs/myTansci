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
    // getters JSON.parse(sessionStorage.getItem('user'))部分需要完善
    // getters: {
    //     getUser():{ username: string; password: string;loginTime: string;}{
    //         if(!this.username){
    //             const user = JSON.parse(sessionStorage.getItem('user'))
    //             this.username = user.username
    //             this.loginTime = user.loginTime
    //         }
    //         return {
    //             username: this.username,
    //             password: this.password,
    //             loginTime: this.loginTime
    //         }
    //     }
    // },
    actions:{
        setUser(data: { username: string; password: string;}){
            this.username = data.username;
            this.password = data.password;
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