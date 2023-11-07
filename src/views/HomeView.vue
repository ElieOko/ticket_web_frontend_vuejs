<script setup lang="ts">
//import products from './appdata/products.json';
import { process } from '@progress/kendo-data-query';
import { Grid } from '@progress/kendo-vue-grid';
import { ApiRoutes } from '@/composable/constant/endpoint';
import type { ITicket } from '@/composable/interface/ITicket';
import type { ITransferStatus } from '@/composable/interface/ITransferStatus';
import type { IUser } from '@/composable/interface/IUser';
import { productsData, token, useAxiosRequestWithToken } from '@/composable/service/common_http';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
  const listTransferStatus = ref<Array<ITransferStatus>>()
  const products           = ref<any>()
  const listTicket         = ref<Array<any>>()
  const user               = ref<IUser>(useUserStore().user) 
  const getAllTicket=(async()=>{
        await(useAxiosRequestWithToken(token).get(`${ApiRoutes.ticketList}`)
            .then(function (response) {
                console.log("ticket",response.data)
                products.value = response.data.tickets;
                listTicket.value = response.data.tickets as Array<any>
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                //alert("Elie Oko");
            }));
    })

    const columns = [
    { field: 'TicketId',title:"N"},
    { field:"CurrencyFId"},             
    { field:"UserFId"},                 
    { field:"TransferTypeFId"},         
    { field:"TransferStatusFId"},
    { field:"Amount"},                  
    { field:"Phone"},             
    { field:"Note"},
    { field:'Name'},
    { field:"Motif"},
    { field:"DateCreated"},
    { field:"ClotureDateCreated"}
    ];
</script>

<template>
  <main>
      <section class="w-full gap-4 bg-red-500">
        <div class="flex flex-row p-4">
          <div class="mr-2 ">
            <label>Début :</label> <input type="date" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
          </div>
          <div class="mr-2">
            <label >Fin :</label> <input type="date" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
          </div>
          <div class="mr-2 relative">
            <label>Type :</label> 
            <select class="ml-2 text-sm w-[150px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow">
              <option value="">Elie oko</option>
              <option value="">oko</option>
              <option value="">Elie</option>
              <option value="">Elio</option>
            </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
          <div class="mr-2 relative">
            <label>Etat :</label> 
            <select class="ml-2 text-sm w-[150px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow">
              <option value="">Libre</option>
              <option value="">oko</option>
              <option value="">Elie</option>
              <option value="">Elio</option>
            </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
          <div class="mr-2">
            <input type="button" @click="getAllTicket" value="Charger" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all   "/>
          </div>
        </div>
        <div class="flex flex-row p-2">
          <div class="ml-2 mr-2">
            <input type="button" value="Save Changes" disabled ="true" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all   "/>
          </div>
          <div class="mr-2">
            <input type="button" value="Cancel Changes" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all   "/>
          </div>
           <div class="mr-2">
            <input type="button" value="Filtrer" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all   "/>
          </div>
           <div class="mr-2">
            <input type="button" value="Export Excel" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all   "/>
          </div>
          <div class="mr-2">
            <input type="button" value="Advanced" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all   "/>
          </div>
        </div>
      </section>
      <!-- <table class="w-full">
        <thead>
          <tr>
            <td ></td>
            <td >
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
                <span  class="text-sm block text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">Number</span>
            </td>
            <td class="border border-black"> 
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td> 
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
            <td class="border border-black">
                <input type="text" class="text-sm w-[50px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2  font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
                <button  class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all ">FT</button>
            </td>
          </tr>
        </thead>
      </table>
      <table class=" w-full bg-[#F8FAFC]">
        <thead>
          <tr class="bg-gray-800">
            <td class="w-[28px] bg-gray-400"></td>
            <th class="border border-black w-[58px]">N</th>
            <th class="border border-black ">Montant</th>
            <th class="border border-black w-[128px]">Nom</th>
            <th class="border border-black">Téléphone</th>
            <th class="border border-black ">Début</th>
            <th class="border border-black">FinS</th>
            <th class="border border-black ">DuréeS</th>
            <th class="border border-black">FinP</th>
            <th class="border border-black">DuréeP</th>
            <th class="border border-black">Etat</th>
            <th class="border border-black">Note</th>
            <th class="border border-black">Agence</th>
            <th class="border border-black">UserS</th>
            <th class="border border-black">UserP</th>
          </tr>
        </thead>
       
        <tbody>
          
          <tr v-for="(item,index) in listTicket">
            <td></td>
            <td  class="text-center">{{ item?.TicketId }}</td>
            <td class="border border-black">{{ item.Amount }}</td>
            <td class="border border-black">{{ item.Name }}</td>
            <td class="border border-black">{{ item.Phone }}</td>
            <td class="border border-black">26-10-2023</td>
            <td class="border border-black">27-10-2023</td> 
            <td class="border border-black">4semaines</td>
            <td class="border border-black">5semaines</td>
            <td class="border border-black">4jours</td>
            <td class="border border-black">{{ item.transfer_status.Name }}</td>
            <td class="border border-black">{{ item.Note }}</td>
            <td class="border border-black">{{"IT "+ item.user.branch.BranchName }}</td>
            <td class="border border-black">Jonathan </td>
            <td class="border border-black">Elie</td>
          </tr>
         
        </tbody>
      </table> -->
  </main>
  <grid
  :data-items="products"
  :columns="columns"
></grid>

</template>

<style>
  label{
    color:white;
  }
  th{
    color:white;
  }
</style>
