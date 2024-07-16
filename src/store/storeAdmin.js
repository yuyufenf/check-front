import { reactive } from 'vue'
import { defineStore } from 'pinia'

const useAdminStore = defineStore('token', () => {
    const data = reactive({
        name: '',
        token: '',
        expires: '',//过期时间
    })

    const save = (name, token, expireDate) => {
        data.name = name;
        data.token = token;
        data.expires = expireDate;
    }

    return {
        data,
        save
    }
},{
    persist: true,//持久化到localStorage
})

export { useAdminStore }