<template>
  <div
    class="h-500 px-8 overflow-auto flex flex-col flex-wrap justify-center items-center text-center"
  >
    <h1 class="sm:text-xl md:text-2xl font-bold">{{ cuerpo.title }}</h1>
    <div class="sm:text-lg md:text-xl">
      <p>{{ cuerpo.body }}</p>
    </div>
    <div class="sm:text-md md:text-lg">
      <p>{{ cuerpo.foot }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  name: "ValkyriaComponent",
  setup() {
    const cuerpo = reactive({ title: "", body: "", foot: "" });
    const imagen = ref("");
    fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/contents/1`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => {
        cuerpo.title = response.title.text;
        cuerpo.body = response.body.text;
        cuerpo.foot = response.foot.text;
      });
    return { imagen, cuerpo };
  }
});
</script>

<style></style>
