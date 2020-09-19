<template>
  <div class="row">
    <div class="col-md-6 mx-auto mt-4">
      <div class="caja card-header borde-wood text-center">
        <h4 class="titulo">{{ cuerpo.title }}</h4>
      </div>
      <div class="card-body">
        <p>{{ cuerpo.body }}</p>
      </div>
      <div>
        <p>{{ cuerpo.foot }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  name: "InformacionComponent",
  setup() {
    const cuerpo = reactive({
      title: "",
      body: "",
      foot: ""
    });
    const imagen = ref("");
    fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/contents/2`, {
      method: "GET"
    })
      .then(response => response.json())
      .then(response => {
        cuerpo.title = response.title.text;
        cuerpo.body = response.body.text;
        cuerpo.foot = response.foot.text;
      });
    return { cuerpo, imagen };
  }
});
</script>

<style>
p {
  color: #fff;
  padding: 5px;
}
</style>
