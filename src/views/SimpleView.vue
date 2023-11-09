<script lang="ts" setup>
import { ApiRoutes } from '@/composable/constant/endpoint';
import type { ITicketRequestClose } from '@/composable/interface/ITicket';
import type { ITransferStatus } from '@/composable/interface/ITransferStatus';
import { token, useAxiosRequestWithToken } from '@/composable/service/common_http';
import { ref, watchEffect } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

    const listTransferStatus    = ref<Array<ITransferStatus>>()
    const showMenu              = ref<Boolean>(false);
    const showLoad              = ref<Boolean>(false);
    const showClose             = ref<Boolean>(false);
    const ticket                = ref<ITicketRequestClose>({
                                    TicketId            : 0,
                                    Motif               : "",
                                    TransferStatusFId   : 3,
                                    ClotureDateCreated  : ""
                                    });
    watchEffect(async () =>{
        await(
            useAxiosRequestWithToken(token).get(`${ApiRoutes.transferStatus}`)
            .then(function (response) {
                listTransferStatus.value = (response.data.transferStatus as Array<ITransferStatus>).filter(status=>status.TransferStatusId == 3)
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                //alert("Elie Oko");
            })
        );
    });
   const toggleNavbar =()=>{
     showMenu.value = !showMenu.value;
    }
    const notify = (msg:string) => {
      toast(msg, {
        autoClose: 10000,
      });
    }
    const close_ticket = async ()=>{
        showLoad.value = true
        const data = JSON.parse(JSON.stringify(ticket.value));
        await useAxiosRequestWithToken(token).post(`${ApiRoutes.ticketClose}`,data).then(function (response) {
            notify(response.data.message);
            showLoad.value = false;
        })
        .catch(function (error) {
            // handle error
            //console.log(error);
            //notify(error as string)
            showLoad.value = false;
        })
        .finally(function () {
            // always executed
           // notify("Chargement encours");
        });
    }
</script>
<template>
    
    <div class="relative mx-auto max-w-[740px] px-4 top-[75px]  md:flex-0 shrink-0 ">
        <div class="relative z-0 flex flex-col bg-[#f8f9fa] min-w-0 break-words border-0 shadow-soft-xl  bg-clip-border">
                <div class="relative py-4  card-head h-16 bg-gray-400  text-black">
                    <div class="">
                    <div>
                        <h1 class="text-center">Fermeture du ticket</h1>
                    </div>
                    </div>
                </div>

                <div class="flex-auto p-6">
                  <form role="form text-left" @submit.prevent="close_ticket">
                    <div class="mb-4">
                        <label>Numéro du ticket</label>
                      <input type="number" v-model="ticket.TicketId" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-4 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" />
                    </div>
                    <div class="mb-4 ">
                        <label>Etat</label> 
                        <div class="relative">
                            <select v-model="ticket.TransferStatusFId" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-4 px-3 font-normal text-gray-700 transition-all focus:border-green-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow">
                                <option v-for="(item,index) in listTransferStatus" :value="item.TransferStatusId">{{ item.Name }}</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>

                    <div class="mb-4">
                        <label>Remarques</label>
                      <textarea v-model="ticket.Motif" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-4 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"></textarea>
                    </div>
                    
                    <div class="flex flex-row gap-4">
                      <button  type="submit" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-400 to-slate-400 hover:border-gray-800   hover:text-white">
                        Enregistrer <svg v-if="showLoad" class="spinner inline h-6 w-6 mr-3" viewBox="0 0 4 4"></svg>
                    </button>
                      <button  @click="" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-red-400 to-red-400 hover:border-red-800   hover:text-white">
                        Fermer et Payer <svg v-if="showClose" class="spinner inline h-6 w-6 mr-3" viewBox="0 0 4 4"></svg>
                    </button>
                    </div>
                </form>
                </div>
        </div>  
    </div>
</template>
<style>
    label{
        color:black;
    }
    .card-head{
        background-color: rgba(0,0,0,.03);
    }
  .spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #25353f;
  border-radius: 50%;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>