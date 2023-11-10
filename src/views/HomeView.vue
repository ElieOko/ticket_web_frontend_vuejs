<script setup lang="ts">
//import products from './appdata/products.json';
import { saveExcel } from '@progress/kendo-vue-excel-export';
import { process, filterBy, type CompositeFilterDescriptor, type SortDescriptor } from '@progress/kendo-data-query';
import { Grid, GridToolbar } from '@progress/kendo-vue-grid';
import { Button } from '@progress/kendo-vue-buttons'
import { ApiRoutes } from '@/composable/constant/endpoint';
import type { ITicket, ITicketFilter } from '@/composable/interface/ITicket';
import type { ITransferStatus } from '@/composable/interface/ITransferStatus';
import { productsData, token, useAxiosRequestWithToken } from '@/composable/service/common_http';
import { useUserStore } from '@/stores/user';
import { computed, ref, watchEffect } from 'vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import type { ITransferType } from '@/composable/interface/ITransferType';
import { getCurrentDate } from '@/composable/service/module_init';
  const listTransferStatus    = ref<Array<ITransferStatus>>()
  const products              = ref<Array<any>>([])
  const loader                = ref<Boolean>(false)
  const listTicket            = ref<Array<any>>()
  const showLoad              = ref<Boolean>(false);
  const showFilter            = ref<Boolean>(false);
  const listTypeTransfer      = ref<Array<ITransferType>>();
  const ticketFilter          = ref<ITicketFilter>({TransferTypeFId:0,TransferStatusFId:0,dateTo:getCurrentDate(),dateFrom:getCurrentDate()})
  const sortable = ref(true);
  const skip = ref<number>(0);
  const take = ref<number>(4);
  const sort = ref<SortDescriptor[] | undefined>([
      { field: "TicketId", dir: "asc" }
    ]);
  const gridPageable = {
        buttonCount: 5,
        info: true,
        type: 'numeric',
        pageSizes: true,
        previousNext: true,
      }  
  const columns = [
    { field: 'TicketId',title:"N",editable: false},
    { field:'Name',filter:'text',editable: false},
    { field:"Amount",filter: "numeric",editor: "numeric"},                  
    { field:"Phone", editable: true,filter:'text',editor: "text"}, 
    { field:"user.UserName",title:"Username",editable: false},
    { field:"DateCreated", title:"DateD",filter: "date",editable: false},
    { field:"ClotureDateCreated",title:"FinD",editor: "date"},
    { field:"transfer_status.Name",title:"Status",editable: false}, 
    { field:"user.branch.BranchName",title:"Agence",editable: false},           
    { field:"Note",filter:'text',editor: "text"}];
    const pageChangeHandler = (event:any) => {
      loader.value = true;
      setTimeout(() => {
       loader.value = false;
        skip.value = event.page.skip;
        take.value = event.page.take;
      }, 300);
    }
    watchEffect(async () =>{
        await(
            useAxiosRequestWithToken(token).get(`${ApiRoutes.transferStatus}`)
            .then(function (response) {
                listTransferStatus.value = response.data.transferStatus as Array<ITransferStatus>
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            })
        );
        await(useAxiosRequestWithToken(token).get(`${ApiRoutes.transferTypeList}`)
            .then(function (response) {
                console.log("transferType",response.data)
                listTypeTransfer.value = response.data.transferTypes as Array<ITransferType>
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            }));
    });    
  const notify = (msg:string) => {
    toast(msg, {
      autoClose: 8000,
    });
    }
  const filter = ref<CompositeFilterDescriptor>({logic: "and", filters: []});
  const getAllTicket=(async()=>{
        await(useAxiosRequestWithToken(token).get(`${ApiRoutes.ticketList}`)
            .then(function (response) {
                products.value = response.data.tickets;
                listTicket.value = response.data.tickets as Array<any>
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            }));
    })
    const editField = ref<any>()
   const itemChange =  (e:any)=> {
            const data =  products.value.slice();
            const index = data.findIndex((d  => d.TicketId === e.dataItem.TicketId ))
            data[index] = { ...data[index], [e.field]: e.value };
            products.value  = data;
            console.log("dataChange",data[index])
            console.log("data",products.value.length)
        }
    const rowClick =  (e:any) => {
         //   this.editID = e.dataItem.ProductID;
            e.dataItem.inEdit = true;
        }
    const cellClick = (e: any) => {
      if (e.dataItem.inEdit && e.field === editField.value) {
        return;
      }
      exitEdit(e.dataItem, true);
      editField.value = e.field;
      e.dataItem.inEdit = e.field;
    }
    const exitEdit =  (dataItem:any, exitEdit:any) => {
      if (!exitEdit && dataItem.inEdit) {
        return;
      }
      products.value.forEach((d) => {
        if (d.inEdit) {
          d.inEdit = undefined;
        }
      });
      editField.value = undefined;
    }
    const cancelChanges = () => {
      let editedItems = products.value.filter((p => p.inEdit === true));
    
        editedItems.forEach((item: any) => {
          item.inEdit = undefined;
        });
        getAllTicket()
    }  
    let ticket = computed(() =>{return (filterBy(products.value, filter.value)).slice(skip.value, take.value + skip.value)})
    const exportExcelFile =()=>{
      let msg = "Aucune donnée chargée..."
      if(products.value.length > 0){
         msg = "Donnée encours de téléchargement..."
        saveExcel({
                data: products.value,
                fileName: "ticket_file",
                columns: columns
            })
      }
      notify(msg)
    }
    const filterChange =  (ev:any)=> {
      loader.value = true;
      console.log(ev);
      setTimeout(() => {
        filter.value = ev.filter;
        loader.value = false;
      }, 300);
    } 
    const dataFilterRequest = async()=>{
      const data = JSON.parse(JSON.stringify(ticketFilter.value));
        await(useAxiosRequestWithToken(token).post(`${ApiRoutes.ticketFilter}`,data)
            .then(function (response) {
                products.value = response.data.tickets;
                listTicket.value = response.data.tickets as Array<any>
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            }));
    }
    const dataUpdate = ()=>{
      showLoad.value = true
      products.value.map(async (product,key)=>{
        const data = JSON.parse(JSON.stringify(product));
        await(useAxiosRequestWithToken(token).post(`${ApiRoutes.ticketEdit}/${product.TicketId}`,data)
            .then(function (response) {
              console.log(response);
              if(products.value.length - 1 == key){
                getAllTicket()
                showLoad.value = false
              }
              
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
            }));
      })
    }
</script>
<template>
  <main>
      <section class="w-full gap-4 bg-red-500">
        <div class="flex flex-row p-4">
          <div class="mr-2 ">
            <label>Début :</label> <input v-model="ticketFilter.dateTo" type="date" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
          </div>
          <div class="mr-2">
            <label >Fin :</label> <input type="date" v-model="ticketFilter.dateFrom" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"/>
          </div>
          <div class="mr-2 relative">
            <label>Type :</label> 
            <select v-model="ticketFilter.TransferTypeFId" class="ml-2 text-sm w-[150px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow">
              <option v-for="(item,index) in listTypeTransfer" :key="index" :value="item.TransferTypeId">{{ item.Name }}</option>
            </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
          <div class="mr-2 relative">
            <label>Etat :</label> 
            <select v-model="ticketFilter.TransferStatusFId" class="ml-2 text-sm w-[150px] focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow">
              <option v-for="(item,index) in listTransferStatus" :value="item.TransferStatusId">{{ item.Name }}</option>
            </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
          </div>
          <div class="mr-2 ">
            <input type="button" @click="dataFilterRequest" value="Search" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all   "/>       
          </div>
           <div class="mr-2 ">          
             <input type="button" @click="getAllTicket" value="Charger" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all   "/>
          </div>
        </div>
        <div class="flex flex-row p-2">
          <div class="ml-2 mr-2">
            
            <button type="button" @click="dataUpdate" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all">
              Save Changes<svg v-if="showLoad" class="spinner inline h-6 w-6 mr-3" viewBox="0 0 4 4"></svg>
            </button>
          </div>
          <div class="mr-2">
            <input type="button" @click="cancelChanges" value="Cancel Changes" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all   "/>
          </div>
           <div class="mr-2">
            <input type="button" @click="exportExcelFile" value="Export Excel" class="text-sm text-gray-700 focus:shadow-soft-primary-outline leading-5.6 ease-soft  appearance-none  border border-solid border-gray-300 bg-gray-200 bg-clip-padding py-2 px-3 font-normal  transition-all   "/>
          </div>
        </div>
      </section>
  </main>
  <grid
    @pagechange="pageChangeHandler"
    :data-items="ticket"
    :total ="ticket.length"
    :columns="columns as any"
    :edit-field="'inEdit'"
    @cellclick="cellClick"
    @itemchange="itemChange"
    :filter="filter"
    @filterchange="filterChange"
    :loader="loader"
    :column-menu="true"
    :pageable="gridPageable"
    :sortable="sortable"
    :sort="sort"
    :take="take"
    :skip="skip"
    >
  </grid>

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

