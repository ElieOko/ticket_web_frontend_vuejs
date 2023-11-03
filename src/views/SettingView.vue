<script lang="ts" setup>
import { ApiRoutes } from '@/composable/constant/endpoint';
import type { ICounter } from '@/composable/interface/ICounter';
import { token, useAxiosRequestWithToken } from '@/composable/service/common_http';
import { ref, watchEffect } from 'vue';

const counterList           = ref<Array<ICounter>>()
const counters              = ref<ICounter>()   
const counterRequest        = ref<ICounter>({
    Name:"",
    BranchFId:0
}) 
    watchEffect(async()=>{
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
            }))});
    const selectCounter = (counter:ICounter)=>{
        counters.value  = counter;
    }
    const store_counter = async ()=>{
        const data = JSON.parse(JSON.stringify(counterRequest.value));
        await useAxiosRequestWithToken(token).post(`${ApiRoutes.counterCreate}`,data).then(function (response) {
            console.log(response)
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
                      <input type="text" :value ="counters?.Name" placeholder="QW" disabled class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft  w-full appearance-none rounded-lg border border-solid border-gray-300 bg-gray-300 bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" />
                    </div>
                   
                    
                    <div class="flex flex-row gap-4">
                      <button  @click="" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-black   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-yellow-300 to-yellow-200   hover:text-white">Modifier</button>
                      <button  @click="" type="button" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-red-500 to-red-500    hover:text-white">Supprimer</button>
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
                  <form role="form text-left" @submit:prevent="store_counter" >
                    <div class="mb-4 ">
                        <label  class="mr-4">Nom</label>
                      <input type="text" v-model="counterRequest.Name" placeholder="name" class="text-sm  focus:shadow-soft-primary-outline leading-5.6 ease-soft w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" />
                    </div>
                    <div class="flex flex-row gap-4">
                      <button type="submit" class="inline-block w-[150px] px-2 py-2 mt-6 mb-2 font-bold text-center text-white   transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-blue-400 to-blue-400 hover:border-blue-800   hover:text-white">Enregistrer</button>
                    </div>
                </form>
                </div>
        </div>
    </form>

</template>