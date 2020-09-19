<template>
  <ValkyriaComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ValkyriaComponent from "@/components/valkyria/ValkyriaComponent.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Valkyria",
  components: {
    ValkyriaComponent
  }
});
</script>
