<script setup lang="ts">
import { computed } from 'vue'
import  {useRouter}  from 'vue-router'

const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`,
)
</script>

<template>
  <!-- <div class="nav">
        <input type="checkbox" id="nav-check">
        <div class="nav-header">
            <div class="nav-title">
                Soficom Q-SYS
            </div>
        </div>
        <div class="nav-btn">
            <label for="nav-check">
            <span></span>
            <span></span>
            <span></span>
            </label>
        </div>
        <div class="nav-links">
            <router-link to="/">Accueil</router-link>
            <router-link to="/simple">Simple</router-link>
            <router-link to="/call">Appels</router-link>
            <router-link to="/setting">Paramètres</router-link>
             <router-link to="/open">Ouvrir ticket</router-link>
           
        </div>
  </div> -->
  <component :is="layout">
    <router-view />
  </component>
</template>
<style scoped>
  .nav {
    height: 50px;
    width: 100%;
    background-color: #4d4d4d;
    position: relative;
  }
  .nav > .nav-header {
    display: inline;
  }
  .nav > .nav-header > .nav-title {
    display: inline;
    float: left;
    font-size: 22px;
    color: #fff;
    padding: 10px 10px 10px 10px;
  }
  .nav > .nav-btn {
    display: none;
  }
  .nav > .nav-links {
    display: inline;
    float: left;
    font-size: 18px;
  }
  .nav > .nav-links > a {
    display: inline-block;
    padding: 13px 10px 13px 10px;
    text-decoration: none;
    color: #efefef;
  }
  .nav > .nav-links > a:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  .nav > #nav-check {
    display: none;
  }

  @media (max-width:600px) {
    .nav > .nav-btn {
      display: inline-block;
      position: absolute;
      right: 0px;
      top: 0px;

      z-index: 99999px;
    }
    .nav > .nav-btn > label {
      display: inline-block;
      width: 50px;
      height: 50px;
      padding: 13px;
    }
    .nav > .nav-btn > label:hover,.nav  #nav-check:checked ~ .nav-btn > label {
      background-color: rgba(0, 0, 0, 0.3);
    }
    .nav > .nav-btn > label > span {
      display: block;
      width: 25px;
      height: 10px;
      border-top: 2px solid #eee;
    }
    .nav > .nav-links {
      position: absolute;
      display: block;
      width: 1000%;
      background-color: #333;
      height: 0px;
      transition: all 0.3s ease-in;
      overflow-y: hidden;
      top: 50px;
      left: 0px;
      z-index:1;
    }
    .nav > .nav-links > a {
      display: block;
      width: 100%;
    }
    .nav > #nav-check:not(:checked) ~ .nav-links {
      height: 0px;
    }
    .nav > #nav-check:checked ~ .nav-links {
      height: calc(50vh - 50px);
      overflow-y: auto;
    }
  }
</style>

