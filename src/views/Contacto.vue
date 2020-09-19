<template>
  <ContactoComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactoComponent from "@/components/contacto/ContactoComponent.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Contacto",
  components: {
    ContactoComponent
  }
});
</script>
