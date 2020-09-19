<template>
  <LoginComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginComponent from "@/components/authentication/LoginComponent.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Login",
  components: {
    LoginComponent,
  },
});
</script>
