<script lang="ts" setup>
import { ApiRoutes } from '@/composable/constant/endpoint';
import type { IUser, IUserAuth } from '@/composable/interface/IUser';
import {token, useAxiosRequestWithToken } from '@/composable/service/common_http';
import { setUser, useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

const showLoad = ref<Boolean>(false);
const router = useRouter();
const auth = ref<IUserAuth>({
    UserName:'',
    Password:''
  }); 
  const notify = (msg:string) => {
      toast(msg, {
        autoClose: 10000,
      });
    }
//ApiRoutes
async function login() {
  showLoad.value = true;
  const data = JSON.parse(JSON.stringify(auth.value));
  await useAxiosRequestWithToken(token).post(`${ApiRoutes.userLogin}`,data).then(function (response) {
    // handle success
    console.log(response)
    setUser(response.data as IUser)
    //useUserStore().setUser(response.data as IUser) 
    router.push("/")
  })
  .catch(function (error) {
    // handle error
    showLoad.value = false
    notify(error.response.data.message)
    console.log(error);
  })
  .finally(function () {
    // always executed
    //alert("Elie Oko");
  });
}

</script>
<template >
   <div class="bg-red-500 h-screen w-screen">
    <div class="relative mx-auto max-w-[445px] px-4 top-[125px]  md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
        <div class="relative z-0 flex flex-col bg-[#F8FAFC] min-w-0 break-words border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                <div class="p-6  text-center bg-[#F8FAFC] border-b-0 rounded-t-2xl">
                  <h2 class="text-2xl font-bold">Soficom</h2>
                </div>
                <div class="text-center bg-[#F8FAFC] border-b-0 rounded-t-2xl">
                  <h2 class="text-2xl">Connexion</h2>
                </div>
                <div class="text-center bg-[#F8FAFC] border-b-0 rounded-t-2xl">
                  <h2 class="text-1xl">Pour accéder à Q-SYS</h2>
                </div>

                <div class="flex-auto p-6">
                  <form role="form text-left" @submit.prevent="login">
                    <div class="mb-4">
                      <input type="text" required v-model="auth.UserName" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-4 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" placeholder="Saisissez l'identifiant" aria-label="Email" aria-describedby="email-addon" />
                    </div>
                    <div class="mb-4">
                      <input type="password" required v-model="auth.Password" class="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-4 px-3 font-normal text-gray-700 transition-all focus:border-blue-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow" placeholder="Saisissez le mot de passe" aria-label="Password" aria-describedby="password-addon" />
                    </div>
                    <input type="checkbox"/> <label>Afficher le mot de passe</label>
                    <div class="text-center">
                     
                      <button  type="submit" class="inline-block w-[250px] px-6 py-3 mt-6 mb-2 font-bold text-center text-white  align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-2sm ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-400 to-slate-400 hover:border-gray-800   hover:text-white">
                        Connexion
                        <svg v-if="showLoad" class="spinner inline h-6 w-6 mr-3" viewBox="0 0 4 4"></svg>
                      </button>
                    </div>
                    <p class="mt-4 mb-0 leading-normal text-center text-sm"> <a href="#" class="font-bold text-blue-500 hover:text-blue-300 hover:underline">Identifiant / Mot de passe oublié?</a></p>
                    <p class="mt-4 mb-0 leading-normal text-center text-sm">En cliquant sur connexion, vous acceptez <a href="#" class="text-blue-500 hover:text-blue-300 hover:underline">notre accord</a></p>
                  </form>
                </div>
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