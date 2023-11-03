<script lang="ts" setup>
import { ApiRoutes } from '@/composable/constant/endpoint';
import type { ICall } from '@/composable/interface/ICall';
import type { ICounter } from '@/composable/interface/ICounter';
import {useAxiosRequestWithToken } from '@/composable/service/common_http';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { IUser } from '@/composable/interface/IUser';
import { useUserStore } from '@/stores/user';

  const user = useUserStore().user
  const listCounter = ref<Array<ICounter>>([]);
  const token = user.token
  const router = useRouter();
  const callInstance = ref<ICall>({
    Ticket      : 0,
    CounterFId  : 0,
    Note        : "",
    UserFId     : user.UserId as unknown as number,
  })
  const clear = ()=>{
    callInstance.value.Ticket     = 0;
    callInstance.value.CounterFId = 0;
    callInstance.value.Note       = "";
  }
  const paiementEvent  = async () => {
    const data = JSON.parse(JSON.stringify(callInstance.value));
    console.log("Call data ->",data)
    await useAxiosRequestWithToken(token).post(`${ApiRoutes}`,data).then(function (response) {
    // handle success
    //alert(response);
      console.log(response)
      router.push("/")
    })
    .catch(function (error) {
    // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
      alert("Elie Oko");
    });
  }

  
</script>
<template>
    <div class="relative mx-auto max-w-[740px] px-4 top-[75px]  md:flex-0 shrink-0 ">
        <div class="relative z-0 flex flex-col bg-[#f8f9fa] min-w-0 break-words border-0 shadow-soft-xl bg-clip-border">
                <div class="relative py-4  card-head h-16 bg-gray-400  text-black">
                    <div class="">
                    <div>
                        <h1 class="text-center">Appels du ticket</h1>
                    </div>
                    </div>
                </div>

                <div class="flex-auto p-6">
                  <form role="form text-left" @submit.prevent ="">
                    <div class="mb-4">
                        <label>Numéro du ticket</label>
                      <input type="number" v-model="callInstance.Ticket" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-4 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" />
                    </div>
                    <div class="mb-4 ">
                        <label>Guichet</label> 
                        <div class="relative">
                            <select v-model="callInstance.CounterFId" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-4 px-3 font-normal text-gray-700 transition-all focus:border-green-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow">
                                <option value="">Libre</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <label>Remarques</label>
                      <textarea v-model="callInstance.Note" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-4 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"></textarea>
                    </div>
                    
                    <div class="flex flex-row gap-4">
                      <button  @click="paiementEvent" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-400 to-slate-400 hover:border-gray-800   hover:text-white">Appeler</button>
                      <button  @click="" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-black   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-yellow-200 to-yellow-200    hover:text-white">Paiement</button>
                    </div>
                </form>
                </div>
        </div>  
        <div class="relative z-0 mt-4 flex flex-col bg-[#f8f9fa] min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div class="relative py-4  card-head h-16 bg-gray-400 rounded-2xl text-black">
                    <div class="">
                    <div>
                        <h1 class="text-center">Messages</h1>
                    </div>
                    </div>
                </div>

                <div class="flex-auto p-6">
                  <form role="form text-left">
                    <div class="mb-4">
                        <label>Message</label>
                      <textarea class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-4 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"></textarea>
                    </div>
                    
                    <div class="flex flex-row gap-4">
                      <button  @click="" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-400 to-slate-400 hover:border-gray-800   hover:text-white">Envoyer</button>
                      <button  @click="" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-800 to-gray-800 hover:border-gray-800   hover:text-white">Effacer</button>
                    </div>
                </form>
                </div>
        </div> 
    </div>
</template>