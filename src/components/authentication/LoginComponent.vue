<template>
  <form class="grid grid-cols-3 gap-2 mx-4 w-full max-w-lg" @submit.prevent="login">
    <div class="col-span-3 mb-4 text-center text-white text-3xl">
      <h1>Login</h1>
    </div>
    <div class="col-span-3 mb-4">
      <!-- shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" -->
      <input class="form-field" id="username" v-model="email" type="email" placeholder="Email" />
      <p v-show="error.email" class="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div class="col-span-3 mb-4">
      <!-- shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" -->
      <input
        class="form-field"
        id="password"
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <p v-show="error.password" class="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <div class="col-span-3">
      <div class="flex flex-col items-center justify-center">
        <a
          class="block font-bold text-sm text-blue-500 hover:text-blue-800 mb-3"
          href="#"
        >Forgot Password?</a>
        <input
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :data-sitekey="rcaptchaSigKey"
          :data-callback="login"
          type="submit"
          value="Login"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import Auth from "../../packages/auth";
import Alerta from "../../packages/alerta";
import router from "@/router";

export default defineComponent({
  name: "LoginComponent",
  props: {
    msg: String
  },
  setup(props) {
    const email = ref("");
    const password = ref("");
    const rcaptchaSigKey = ref("6LeqkcsZAAAAAMcRTTo10qgTN0w_V34IzsGz7HHl");
    const error = reactive({
      email: false,
      password: false
    });
    // ****************** methods! ******************
    const login = () => {
      const auth = new Auth();
      const data = {
        username: email.value,
        password: password.value
      };
      const alerta = new Alerta();
      fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/login`, {
        method: "POST",
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => {
          if (response.access_token) {
            auth.setToken(
              response.access_token,
              response.expires_in + Date.now()
            );
            //despues de haber seteado el token y la expiracion redirigimos a la pagina ppal
            router.push("/panel");
          } else {
            alerta.warning("Login", "No se pudo iniciar sesión");
          }
        })
        .catch(error => {
          alerta.error("Login", "Error al intentar loguearse");
        });
    };
    return {
      email,
      password,
      rcaptchaSigKey,
      error,
      // methods
      login
    };
  }
});
</script>

<style></style>
