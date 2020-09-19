<template>
  <div id="principal">
    <div class="h-8 flex justify-end items-center">
      <button
        v-if="estadoSesion !== null"
        id="login"
        @click="login"
        class="p-2 button"
      >{{ estadoSesion }}</button>
    </div>
    <navbar></navbar>
    <div>
      <div class="componente-contenido blanco">
        <div class="flex flex-wrap justify-center">
          <router-view v-slot="{ Component }">
            <transition
              enter-active-class="animated bounceInLeft"
              leave-active-class="animated bounceOutRight"
              mode="out-in"
            >
              <keep-alive>
                <component :is="Component"></component>
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>

      <bloqueAppComponent
        v-for="content in contents"
        :key="content.id"
        :color="content.color"
        :title="content.title"
        :body="content.body"
      />
      <!-- <BloqueAppComponent
        color="rojo"
        title="Sobre el producto"
        body="La hidromiel es una bebida muy noble, es de fermentación natural y
            sus ingredientes principales son agua, miel y levadura. Presenta
            sabores parecidos a los de la sidra aunque su carácter es único,
            produce un efecto de acidez al principio y deja una sensacón cremosa
            sobre el final, y su fina gasificación natural brinda una agradable
            sensación, sin dudas la ronda de valkyrias recién está comenzando"
      />-->
    </div>
  </div>
  <div class="footer">
    <div class="w-full h-20 flex justify-center items-center">
      <i class="h-20 w-20 text-white cursor-pointer" @click="goUp">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 11l7-7 7 7M5 19l7-7 7 7"
          />
        </svg>
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted } from "vue";
import Navbar from "./components/navbar.vue";
import bloqueAppComponent from "./components/informacion/BloqueAppComponent.vue";
import Auth from "./packages/auth";
import "@/assets/css/animate.css";
import "@/assets/css/main.scss";

import router from "@/router";

type datat = {
  loaded: boolean;
  estadoSesion: string | null;
  ruta: string;
  windowBottom: number;
  classList: Array<any>;
  auth: any;
};
const CONTENTS = [
  {
    id: 1,
    title: "Bajada",
    body:
      "Con Valkyria nos esforzamos por lograr un producto de identidad propia distinguible de cualquier otro de su misma categoría, proponiendo una estética provocadora y rebelde Con Valkyria nos esforzamos por lograr un producto de identidad propia distinguible de cualquier otro de su misma categoría, proponiendo una estética provocadora y rebelde Con Valkyria nos esforzamos por lograr un producto de identidad propia distinguible de cualquier otro de su misma categoría, proponiendo una estética provocadora y rebelde",
    color: "violeta"
  },
  {
    id: 2,
    title: "Sobre el producto",
    body:
      "La hidromiel es una bebida muy noble, es de fermentación natural y sus ingredientes principales son agua, miel y levadura. Presenta sabores parecidos a los de la sidra aunque su carácter es único, produce un efecto de acidez al principio y deja una sensacón cremosa sobre el final, y su fina gasificación natural brinda una agradable sensación, sin dudas la ronda de valkyrias recién está comenzando",
    color: "rojo"
  }
];
export default defineComponent({
  setup() {
    const contents = ref(CONTENTS);
    const loaded = ref(false);
    const estadoSesion = ref<string | null>(null);
    const ruta = ref("");
    const windowBottom = ref(0);
    const classList = reactive({ classes: [] });
    const auth = ref(new Auth());

    const checkSession = () => {
      if (auth.value.isAuthenticated()) {
        estadoSesion.value = "Cerrar sesión";
        document.querySelector("#login")?.classList.remove("btn-success");
        document.querySelector("#login")?.classList.add("btn-warning");
      }
    };

    const goUp = () => {
      window.scrollTo(0, 0);
    };

    // window.addEventListener("scroll", handleScroll);
    const load = () => {
      // ponemos esta parte adentro para "escuchar"  cuando la imagen termina de realizar su animación y disparar las siguientes,
      // const loading = document.getElementById('loading')
      // loading.addEventListener("animationend",function(){
      const barraNavegacion = document.getElementById("barra-navegacion");
      barraNavegacion?.classList.add("animated", "bounceInLeft");
      barraNavegacion?.addEventListener(
        "animationend",
        function() {
          const valkyriaLogos = document.getElementsByClassName("logo-valk");
          for (let i = 0; i < valkyriaLogos.length; i++) {
            valkyriaLogos[i].classList.remove("invisible");
            valkyriaLogos[i].classList.add("animated");
            valkyriaLogos[i].classList.add("fadeIn");
          }
          barraNavegacion?.classList.remove("animated", "bounceInLeft");
        },
        false
      );
      // var logo = document.getElementById('valkyriaLogo')
    };

    const login = () => {
      if (auth.value.isAuthenticated()) {
        auth.value.destroyToken();
        login();
      } else {
        window.location.href = "/login";
      }
    };
    const getContents = () => {
      fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/contents`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(response => {
          contents.value = [];
          let counterLoop = 0;
          response.forEach(
            ({
              id,
              title,
              body
            }: {
              id: number;
              title: string;
              body: string;
            }) => {
              // "title", "body", "foot" estas claves son reservadas para el contenido ppal
              if (["title", "body", "foot"].indexOf(title) == -1) {
                if (counterLoop % 2 === 0) {
                  contents.value.push({ id, title, body, color: "violeta" });
                } else {
                  contents.value.push({ id, title, body, color: "rojo" });
                }
                counterLoop++;
              }
            }
          );
        });
    };

    onMounted(() => {
      getContents();
      load();
      checkSession();
    });

    return {
      loaded,
      estadoSesion,
      ruta,
      windowBottom,
      classList,
      auth,
      contents,
      // methods
      checkSession,
      goUp,
      load,
      login
    };
  },
  components: {
    navbar: Navbar,
    bloqueAppComponent
  }
});
</script>

<style>
.above-nav {
  @apply my-8;
}
.componente-contenido {
  @apply pt-10;
  min-height: 100vh;
}
.blanco {
  background-color: rgba(255, 255, 255, 0.4); /*#ffffff;*/
}
</style>
