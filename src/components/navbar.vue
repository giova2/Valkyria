<template>
  <!-- ESTE NAVBAR ESTÁ HECHO CON EL FIN DE MOSTRAR LOS BOTONES A LOS LADOS CUANDO ESTÁ COMPLETAMENTE ABIERTA LA VENTANA EL LOGO AL COSTADO
  -->
  <nav
    id="barra-navegacion"
    class="flex items-center justify-between flex-wrap bg-indigo-800 border-yellow-500 border-b-4 border-t-4 p-6"
  >
    <div class="flex items-center flex-shrink-0 text-white mr-6">
      <div class="absolute left-0 top-0">
        <img class="sm:block md:hidden logo-valk invisible" src="@/assets/logo_valkyria.png" />
      </div>
    </div>
    <div class="block sm:hidden">
      <button
        class="flex items-center px-3 py-2 border rounded text-red-200 border-red-400 hover:text-white hover:border-white"
        @click="displayMenu"
      >
        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div v-show="showMenu" class="block sm:hidden w-full">
      <ul class="text-right text-sm lg:flex-grow">
        <li>
          <router-link tag="li" :to="ValkyriaRoute">
            <span
              class="inline-block lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
            >Concepto Valkyria</span>
          </router-link>
        </li>
        <li>
          <router-link v-if="showPanel" tag="li" :to="PanelRoute">
            <span
              class="inline-block lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
            >Panel</span>
          </router-link>
        </li>
        <li>
          <router-link tag="li" :to="ContactoRoute">
            <span
              class="inline-block lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
            >Contacto</span>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="hidden sm:block flex-grow lg:flex lg:items-center lg:w-auto">
      <ul class="text-right text-sm lg:flex-grow">
        <router-link tag="li" :to="ValkyriaRoute">
          <span
            class="inline-block lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
          >Concepto Valkyria</span>
        </router-link>
        <router-link v-if="showPanel" tag="li" :to="PanelRoute">
          <span
            class="inline-block lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
          >Panel</span>
        </router-link>
        <router-link tag="li" :to="ContactoRoute">
          <span
            class="inline-block lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4"
          >Contacto</span>
        </router-link>
      </ul>
    </div>
    <div id="valkyria_logo_min" class="absolute top-0">
      <img class="hidden md:block logo-valk invisible" src="@/assets/logo_valkyria.png" />
    </div>
  </nav>
</template>

<script>
import { defineComponent, onMounted, onUpdated, ref } from "vue";
import Auth from "../packages/auth";
export default defineComponent({
  name: "Navbar",
  setup() {
    const BASE = process.env.VUE_APP_BASE_PATH
      ? process.env.VUE_APP_BASE_PATH
      : "";
    const ValkyriaRoute = ref(BASE + "/");
    const PanelRoute = ref(BASE + "/panel");
    const ContactoRoute = ref(BASE + "/contacto");
    const showPanel = ref(null);
    const showNavbar = ref(true);
    const showMenu = ref(true);
    onMounted(() => {
      const auth = new Auth();
      showPanel.value = auth.isAuthenticated();
    });
    onUpdated(() => {
      const auth = new Auth();
      showPanel.value = auth.isAuthenticated();
    });
    const displayMenu = () => {
      showMenu.value = !showMenu.value;
    };
    return {
      showPanel,
      showNavbar,
      showMenu,
      ValkyriaRoute,
      PanelRoute,
      ContactoRoute,
      // methods
      displayMenu
    };
  }
});
</script>

<style>
.logo-valk {
  width: 150px;
}
#valkyria_logo_min {
  left: 50%;
  transform: translateX(-50%);
  transition: top 1s;
}
</style>
