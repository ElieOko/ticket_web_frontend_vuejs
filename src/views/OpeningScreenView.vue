<script lang="ts" setup>
import { getTicket } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
    const router = useRouter();
    const aboutFt       = "Toujours votre écoute, pour mieux vous servir en toute sécurité et rapidité"
    const contact       = "Plus d'info +243 819 872 444, +243 998724 444"
    const email         = "email: dir@groupsoficom.com"
    const site          = "web:http://www.groupesoficom.com"
    const dk            = "Veuillez nous contacter au cas de problème"
    const tabText       = [aboutFt,contact,email,site,dk]
    const ticket        =  getTicket()
    console.log(getTicket())
    const content = ref<any>()
    const tabOriginal   = ["Soficom Transfert","GombeIT",ticket?.transfer_type?.Name,ticket?.Name,ticket?.currency?.CurrencyName,ticket?.DateCreated]
    const back = ()=>{
        router.push({path:"/open"});
    }
    const close = ()=>{
        router.push({path:"/"});
    }
    const payerMarquet = ()=>{

    }
    const printer = ():Boolean =>{
        var header_str = '<html><head><title></title></head><body>'; 
        var footer_str = '</body></html>'; 
        var new_str = ((document.getElementById("printable-content")) as HTMLElement).innerHTML; 
        var old_str = document.body.innerHTML; 
        document.body.innerHTML = header_str + new_str + footer_str; 
        window.print(); 
        document.body.innerHTML = old_str;
        return false
    }
    
    
</script>
<template>
    <main :ref="content" class="mx-auto container">
    <div id="printable-content" class=" p-2 rounded-md w-full h-[490px] mt-8 bg-[#f8f9fa] ">
       <div>
            <div class="relative flex">
                <div>1</div>
                <div class="absolute right-0">Original</div>
            </div>
            <ul>
                <li v-for="item in tabOriginal">{{ item }}</li>
            </ul>
            <br/>
            <div class="relative flex">
                <div>1</div>
                <div class="absolute right-0">Client</div>
            </div>
            <ul>
                <li v-for="item in tabOriginal">{{ item }}</li>
            </ul>
           
            <ul>
                <li v-for="item in tabText">{{ item }}</li>
            </ul>
       </div> 
      
    </div>
    <div class="flex gap-2">
           <input type="button" @click="printer" value="Imprimer" class="inline-block w-[150px] px-6 py-3 mt-6 mb-2 font-bold text-center text-white  align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro  ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-400 to-slate-400 hover:border-gray-800   hover:text-white"/>
           <input type="button" @click="close" value="Fermer" class="inline-block w-[150px] px-6 py-3 mt-6 mb-2 font-bold text-center text-white  align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro  ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-400 to-slate-400 hover:border-gray-800   hover:text-white"/>
           <input type="button" @click="back" value="Retour" class="inline-block w-[150px] px-6 py-3 mt-6 mb-2 font-bold text-center text-white  align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-400 to-slate-400 hover:border-gray-800   hover:text-white"/>
           <!-- <input type="button" @click="" value="Marquer comme payé" class="inline-block w-[200px] px-6 py-3 mt-6 mb-2 font-bold text-center text-white  align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-400 to-slate-400 hover:border-gray-800   hover:text-white"/> -->
        </div>
    </main>   
</template>