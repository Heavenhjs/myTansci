import { defineStore } from "pinia";

export const useUserStore = defineStore({
    id:'user', //id唯一且必须
    state:()=>{
        return {
            username:'',
            password:'',
            logintime: '',
        }
    },
    // getters JSON.parse(sessionStorage.getItem('user'))部分需要完善
    // getters: {
    //     getUser():{ username: string; password: string;loginTime: string;}{
    //         if(!this.username){
    //             const user = JSON.parse(sessionStorage.getItem('user'));
    //             this.username = user.username;
    //             this.logintime = user.loginTime;
    //         }
    //         return {
    //             username: this.username,
    //             password: this.password,
    //             loginTime: this.logintime
    //         }
    //     }
    // },
    actions:{
        setUser(data: { username: string; password: string; logintime: string}){
            this.username = data.username;
            this.password = data.password;
            this.logintime = data.logintime;
            sessionStorage.setItem('user', JSON.stringify({
                username: data.username,
                loginTime: data.logintime
            }))
        },
        updateName(name: string){
            this.username = name;
            // console.log(this.username);
        },
        updatePassword(password: string){
            this.password = password;
        }
    }
})