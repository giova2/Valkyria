<template>
  <PanelComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PanelComponent from "@/components/panel/PanelComponent.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Panel",
  components: {
    PanelComponent
  }
});
</script>
