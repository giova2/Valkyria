<template>
  <div>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container w-5/6">
            <div class="w-full text-center">
              <button class="valk-button button" @click="$emit('close')">Cerrar</button>
            </div>
            <div class="pt-3 text-center font-bold text-xl">
              <h3>Lista de contenidos</h3>
            </div>
            <div class="modal-body">
              <slot name="body">
                <ul id="example-1" class="list-group">
                  <li v-for="item in items" v-bind:key="item.id" class="p-2">
                    <div
                      class="py-2 text-center cursor-pointer hover:bg-gray-600"
                      @click="emitir(item)"
                    >
                      <label class="mb-2 underline" role="content">{{ item.name }}</label>
                      <p class="texto-modal">{{ item.text }}</p>
                    </div>
                    <hr />
                    <div class="py-2" @click="visible(item)">
                      <label role="content">Visible</label>
                      <input
                        type="checkbox"
                        class="ml-2"
                        :value="item.id"
                        :checked="item.visible == 1"
                      />
                    </div>
                  </li>
                </ul>
              </slot>
            </div>

            <div class="w-full text-center">
              <button class="valk-button button" @click="$emit('close')">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import Auth from "@/packages/auth";
import Alerta from "@/packages/alerta";

export default defineComponent({
  props: ["myPage"],
  setup(
    props,
    {
      emit
    } /* el segundo argumento del setup es el contexto, que está compuesto por attrs, slot y emit */
  ) {
    const datos = reactive({ page: props.myPage });
    const items = ref([]);
    const getContents = () => {
      fetch(
        `${process.env.VUE_APP_LARAVEL_API_URL}api/contents/${props.myPage}`,
        { method: "GET" }
      )
        .then(response => response.json())
        .then(response => {
          items.value = response;
        });
    };
    const emitir = (item: any) => {
      emit("contenido", item);
    };
    const visible = (item: any) => {
      item.visible = item.visible == 0 ? 1 : 0;
      const auth = new Auth();
      const $alerta = new Alerta();
      //ver como enviar un PUT en Laravel
      fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/contents/`, {
        method: "POST",
        body: JSON.stringify({ ...item, _method: "PUT" }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getToken()}`
        }
      })
        .then(response => response.json())
        .then(response => {
          $alerta.success("Panel", "Se logró lo que se buscaba?");
        });
    };
    getContents();
    return {
      datos,
      items,
      // methods
      getContents,
      emitir,
      visible
    };
  }
});
</script>

<style>
/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
