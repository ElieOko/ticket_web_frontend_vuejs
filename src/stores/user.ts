import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IUser } from '@/composable/interface/IUser'

export const useUserStore = defineStore('ticket', {
    state: () => {
        return{
            user: {} as IUser
        }
    }, 
    actions:{
        setUser (payload:IUser) {
            this.user = payload
        }
    },
    persist: true,
},
)
