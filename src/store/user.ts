import { defineStore } from "pinia";

export const userUserStore = defineStore({
    id:'user', //id唯一且必须
    state:()=>{
        return {
            name:'张三',
            age: 16
        }
    },
    actions:{
        updateName(name: string){
            this.name = name;
            console.log(this.name);
        },
        updateAge(age: number){
            this.age = age;
        }
    }
})