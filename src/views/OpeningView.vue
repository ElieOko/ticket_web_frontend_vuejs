<script lang="ts" setup>
import { ApiRoutes } from '@/composable/constant/endpoint';
import type { ICurrency } from '@/composable/interface/ICurrency';
import type { ITicket } from '@/composable/interface/ITicket';
import type { ITransferType } from '@/composable/interface/ITransferType';
import { token, useAxiosRequestWithToken } from '@/composable/service/common_http';
import { setTicket, useUserStore } from '@/stores/user';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

    const router = useRouter();
    const listCurrency = ref<Array<ICurrency>>();
    const listTypeTransfer = ref<Array<ITransferType>>();
    const showLoad= ref<Boolean>(false)    
    const user = useUserStore().user
    //const token = user.token
    const ticket = ref<ITicket>({
            Amount                  :   0,
            CurrencyFId             :   0,
            Motif                   :   "",
            UserFId                 :   user.UserId as unknown as number,
            TransferTypeFId         :   0,
            Phone                   :   "",
            TransferStatusFId       :   3,
        })
    const regex = "^((\\+243-?)|0)?[0-9]{9}$" as unknown as RegExp
    const storeTicket = async () =>{
             showLoad.value = true
            if(ticket.value.CurrencyFId == 0 || ticket.value.TransferTypeFId == 0 || ticket.value.Amount == 0 ){
                alert("Certains champs sont vide");
                showLoad.value = false
                return
            }
            const data = JSON.parse(JSON.stringify(ticket.value))
            await useAxiosRequestWithToken(token).post(`${ApiRoutes.ticketCreate}`,data).then(function (response) {
            // handle success
            notify(response.data.message);
            console.log(response)
            if(response.data.message == "Enregistrement réussie avec succès"){
                setTicket(response.data.ticket[0])
                router.push({path:"/open/screen"});
            }
  
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            notify("Erreur detecter au niveau du serveur")
            })
            .finally(function () {
            // always executed   
            showLoad.value = false   
            });
        }
        const notify = (msg:string) => {
      toast(msg, {
        autoClose: 10000,
      });
    }
    const errorCurrency = computed(() => {
      return ticket.value.CurrencyFId === 0 ? "Choisissez une devise" : "";
    });
    // const errorPhone = computed(() => {
    //   return regex.test(ticket.value.Phone as string) ? "Mette un numero valide" : "";
    // });
    const errorType = computed(() => {
      return ticket.value.TransferTypeFId  === 0 ? "Choisissez le type de transfer" : "";
    });
    const errorAmount = computed(() => {
      return ticket.value.Amount  === 0 ? "Le montant 0 n'est pas attribuable pour un transfer" : "";
    });
    watchEffect(async()=>{
        await(useAxiosRequestWithToken(token).get(`${ApiRoutes.currencyList}`)
            .then(function (response) {
                console.log("currency",response.data)
                listCurrency.value = response.data.currencies as Array<ICurrency>
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                //alert("Elie Oko");
            }));
        await(useAxiosRequestWithToken(token).get(`${ApiRoutes.transferTypeList}`)
            .then(function (response) {
                console.log("transferType",response.data)
                listTypeTransfer.value = response.data.transferTypes as Array<ITransferType>
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                //alert("Elie Oko");
            }));
    })
</script>
<template>
    <div class="relative mx-auto max-w-[780px] px-4 top-[105px]  md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-9/12">
        <div class="relative z-0 flex flex-col w-full  bg-[#f8f9fa] min-w-0 break-words border-0 shadow-soft-xl  bg-clip-border">
                    <div class="relative py-4  card-head h-16 bg-gray-400  text-black">
                        <div class="">
                            <div>
                                <h1 class="text-center">Ouverture simple du ticket</h1>
                            </div>
                        </div>
                    </div>
                    <div class="flex-auto p-6">
                        <form role="form text-left" @submit.prevent="storeTicket">
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label>Montant</label>
                                    <input type="number" v-model="ticket.Amount"  class="text-sm  block focus:shadow-soft-primary-outline leading-5.6 ease-soft w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" />
                                    <div class="text-red-500 ml-4" v-if="errorAmount">
                                        {{ errorAmount }}
                                    </div>
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                    <label class="ml-2">Devise</label>
                                    <div class="relative">
                                        <select v-model="ticket.CurrencyFId" class="ml-2 text-sm w-full focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none rounded-lg   border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow">
                                            <option v-for="(item,index) in listCurrency" :key="index"  :value="item.CurrencyId">{{ item.CurrencyCode}}</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                    <div class="text-red-500 ml-4" v-if="errorCurrency">
                                        {{ errorCurrency }}
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label>Téléphone</label>
                                    <input type="tel" v-model="ticket.Phone"  class="text-sm  block focus:shadow-soft-primary-outline leading-5.6 ease-soft w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" />
                                    <!-- <div class="text-red-500 ml-4" v-if="errorPhone">
                                        {{ errorPhone }}
                                    </div> -->
                                </div>
                                <div class="w-full md:w-1/2 px-3">
                                    <label class="ml-2" >Type</label>
                                    <div class="relative">
                                        <select v-model="ticket.TransferTypeFId" class="ml-2 text-sm w-full rounded-lg  focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow">
                                            <option v-for="(item,index) in listTypeTransfer" :key="index" :value="item.TransferTypeId">{{ item.Name }}</option>
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                        </div>
                                    </div>
                                    <div class="text-red-500 ml-4" v-if="errorType">
                                        {{ errorType }}
                                    </div>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label  class="mr-4">Motif</label>
                                <textarea v-model="ticket.Motif"  class="text-sm  block focus:shadow-soft-primary-outline leading-5.6 ease-soft w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"></textarea>
                            </div>
                            <div class="flex flex-row gap-4">
                                <button  type="submit" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-400 to-gray-400 hover:text-white">
                                    Enregistrer  <svg v-if="showLoad" class="spinner inline h-6 w-6 mr-3" viewBox="0 0 4 4"></svg>
                                </button>
                            </div>
                        </form>
                    </div>
        </div>
    </div>  
</template>
<style>
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