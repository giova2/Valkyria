<template>
  <div class="row">
    <div class="col-md-6 mx-auto mt-4">
      <div class="card">
        <h5 class="card-header">Register</h5>
        <div class="card-body">
          <form class="form-horizontal" role="form" method="POST" action="{{ route('login') }}">
            <!-- <input type="hidden" name="_token" value="{{ csrf_token() }}"> -->

            <div class="form-group">
              <input v-model="name" type="text" class="form-control" placeholder="Name" />
            </div>

            <div class="form-group">
              <input v-model="email" type="email" class="form-control" placeholder="Email" />
            </div>

            <div class="form-group">
              <input v-model="password" type="password" class="form-control" placeholder="Password" />
            </div>
            <div>
              <button @click="register" class="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import Auth from "../../packages/auth";
import router from "@/router";

export default defineComponent({
  name: "RegisterComponent",
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");

    const register = () => {
      const data = {
        name: name.value,
        email: email.value,
        password: password.value
      };
      fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => {
          const auth = new Auth();
          auth.setToken(
            response.access_token,
            response.expires_in + Date.now()
          );
          //despues de haber seteado el token y la expiracion redirigimos a la pagina ppal
          router.push("/");
        });
    };
    return {
      name,
      email,
      password,
      //methods
      register
    };
  }
});
</script>

<style></style>
