<script lang="ts" setup>
import { ApiRoutes } from '@/composable/constant/endpoint';
import type { ICounter } from '@/composable/interface/ICounter';
import { token, useAxiosRequestWithToken } from '@/composable/service/common_http';
import { ref, watchEffect } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
    const counterList           = ref<Array<ICounter>>()
    const counters              = ref<ICounter>()   
    const showUpdate            = ref<Boolean>(false)
    const showLoad              = ref<Boolean>(false)
    const showUpgrade           = ref<Boolean>(false)
    const counterRequest        = ref<ICounter>({
        Name:"",
        BranchFId:0
    })
    const counterRequestStore   = ref<ICounter>({
        Name:"",
        BranchFId:1
    })  
    const callStateButton = ()=>{
        showUpdate.value = !showUpdate.value
    }
    const getAllCounter =
        async()=>{
        await(useAxiosRequestWithToken(token).get(`${ApiRoutes.counterList}`)
            .then(function (response) {
                console.log("currency",response.data)
                counterList.value = response.data.counters as Array<ICounter>
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                //alert("Elie Oko");
            }))}
  
    watchEffect( async()=>{
            getAllCounter()
        }    
    );
    const selectCounter = (counter:ICounter)=>{
        counters.value  = counter;
    }
    const store_update = async (id : number)=>{
        showUpgrade.value = true
        const data = JSON.parse(JSON.stringify(counterRequest.value));
        await useAxiosRequestWithToken(token).post(`${ApiRoutes.counterUpdate}/${id}`,data).then(function (response) {
            console.log(response)
            getAllCounter()
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
            showUpgrade.value = false
        });
    }
    const store_counter = async ()=>{
        showLoad.value = true
        const data = JSON.parse(JSON.stringify(counterRequestStore.value));
        await useAxiosRequestWithToken(token).post(`${ApiRoutes.counterCreate}`,data).then(function (response) {
            console.log(response)
            getAllCounter()
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
            showLoad.value = false
        });
    }
</script>
<template>
  
    <form class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-4 p-20 relative">
        <div class="relative z-0 h-96  flex flex-col bg-[#f8f9fa] break-words border-0 shadow-soft-xl  bg-clip-border">
                <div class="relative py-4  card-head h-16 bg-gray-400  text-black">
                    <div class="">
                    <div>
                        <h1 class="ml-4">Liste des guichets</h1>
                    </div>
                    </div>
                </div>
                    <div class="p-6">
                        <table class="appearance-none rounded-lg border border-solid">
                            <tbody>
                                <tr class="" v-for="(item,index) in counterList">
                                    <td @click="selectCounter(item)" class="border border-gray-400 w-[400px] rounded-sm h-12 cursor-pointer bg-white hover:bg-[#f8f9fa]">{{ item.Name }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> 
        </div>
        <div class="relative z-0 flex flex-col h-64 w-full bg-[#f8f9fa] min-w-0 break-words border-0 shadow-soft-xl  bg-clip-border">
                <div class="relative py-4  card-head h-16 bg-gray-400  text-black">
                    <div class="">
                    <div>
                        <h1 class="ml-4">Details pour le guichet : {{counters?.Name}}</h1>
                    </div>
                    </div>
                </div>

                <div class="flex-auto p-6">
                  <form role="form text-left">
                    <div class="mb-4">
                   
                        <label class="mr-4">Nom</label>
                      <input type="text" v-model="counterRequest.Name" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft  w-full appearance-none rounded-lg border border-solid border-gray-300 bg-gray-300 bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" />
                    </div> 
                    <div class="flex flex-row gap-4" v-if="!showUpdate">
                      <button  @click="callStateButton" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-black   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-yellow-300 to-yellow-200   hover:text-white">Modifier</button>
                      <button  @click="" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-red-500 to-red-500    hover:text-white">Supprimer</button>
                    </div>
                    <div class="flex flex-row gap-4" v-else>
                      <button  @click="store_update(counters?.CounterId as number)" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-black   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-blue-800 hover:text-white">
                        Enregistrer
                      </button>
                      <button @click="callStateButton" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-red-500 to-red-500    hover:text-white">Annuler</button>
                    </div>

                </form>
                </div>
        </div>
        <div class="relative z-0 flex flex-col w-full h-64 bg-[#f8f9fa] min-w-0 break-words border-0 shadow-soft-xl  bg-clip-border">
                <div class="relative py-4  card-head h-16 bg-gray-400  text-black">
                    <div class="">
                    <div>
                        <h1 class="ml-4">Ajouter un guichet</h1>
                    </div>
                    </div>
                </div>

                <div class="flex-auto p-6">
                  <form role="form text-left" >
                    <div class="mb-4 ">
                        <label  class="mr-4">Nom</label>
                      <input type="text" required v-model="counterRequestStore.Name" placeholder="name" class="text-sm  focus:shadow-soft-primary-outline leading-5.6 ease-soft w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" />
                    </div>
                    <div class="flex flex-row gap-4">
                      <button type="button" @click="store_counter" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-blue-400 to-blue-400 hover:border-blue-800   hover:text-white">
                        Enregistrer <svg v-if="showLoad" class="spinner inline h-6 w-6 mr-3" viewBox="0 0 4 4"></svg>
                      </button>
                    </div>
                </form>
                </div>
        </div>
    </form>

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