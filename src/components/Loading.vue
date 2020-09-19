<template>
  <div
    class="w-screen h-screen flex justify-center items-center absolute top-0 left-0 bg-yellow-500 bg-opacity-25"
  >
    <div class="w-3/5 h-20 flex justify-center text-xl text-white font-bold">
      <h1>Enviando..</h1>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Loading"
});
</script>