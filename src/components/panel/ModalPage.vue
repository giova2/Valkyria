<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container w-5/6">
          <form @submit.prevent="submit">
            <div class="py-3 text-center font-bold text-xl">
              <h3>Agregar página</h3>
            </div>

            <div class="modal-body">
              <slot name="body">
                <input type="text" class="form-field" v-model="datos.pageName" placeholder="Nombre" />
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <input class="valk-button" type="submit" value="Enviar" />
                <button class="valk-button button ml-1" @click="$emit('close')">Cerrar</button>
              </slot>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { defineComponent, ref, reactive } from "vue";
import Alerta from "@/packages/alerta";
import Auth from "@/packages/auth";

export default defineComponent({
  setup(props, { emit }) {
    const datos = reactive({
      pageName: ""
    });
    const submit = () => {
      const auth = new Auth();
      fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/pages/`, {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getToken()}`
        }
      })
        .then(response => response.json())
        .then(response => {
          const alerta = new Alerta();
          if (response.id) {
            emit("pagina-agregada", response);
            emit("close");
          } else {
            alerta.error("Panel", "Ocurrio algún error inesperado");
          }
        });
    };
    return { datos, submit };
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
