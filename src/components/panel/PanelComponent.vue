<template>
  <div class="w-3/4 h-screen">
    <div class="mb-6 text-center text-white text-3xl">
      <h4>New content</h4>
    </div>
    <div class="w-full px-3 mb-2 text-center">
      <button
        id="show-modal-lista"
        class="valk-button button"
        @click="showModalLista = true"
      >Ver partes</button>
    </div>
    <ModalContents
      v-if="showModalLista"
      @close="showModalLista = false"
      v-bind:myPage="datosForm.pageId"
      v-on:contenido="contenidoSeleccionado"
    ></ModalContents>

    <div class="w-full px-3 mb-4 md:mb-0">
      <input v-model="datosForm.name" type="text" class="form-field" placeholder="Name" />
    </div>
    <div class="w-full px-3 mb-4 md:mb-0 text-center">
      <label>Página</label>
      <select v-model="datosForm.pageId" class="form-field">
        <option
          v-for="option in options"
          v-bind:key="option.id"
          v-bind:value="option.id"
        >{{ option.name }}</option>
      </select>
      <div class="w-full px-3 mb-2 text-center">
        <button id="show-modal" class="valk-button button" @click="showModal = true">Add page</button>
        <button
          class="valk-button ml-2"
          v-if="datosForm.pageId != ''"
          @click="deletePage"
        >Delete page</button>
      </div>
      <!-- use the modal component, pass in the prop -->
      <ModalPage v-if="showModal" @close="showModal = false" v-on:pagina-agregada="paginaAgregada"></ModalPage>
    </div>

    <div class="w-full px-3 mb-4 md:mb-0">
      <textarea
        v-model="datosForm.text"
        class="form-field"
        placeholder="Ingrese un texto para el contenido"
        rows="5"
      ></textarea>
    </div>

    <div class="w-full px-3 my-4">
      <label>Visible</label>
      <input
        class="ml-2"
        v-model="datosForm.visible"
        type="checkbox"
        :checked="datosForm.visible == 1"
      />
    </div>
    <div class="text-center">
      <button @click="submit" class="valk-button">Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import ModalPage from "./ModalPage.vue";
import ModalContents from "./ModalContents.vue";
import { defineComponent, ref, reactive } from "vue";
import Alerta from "@/packages/alerta";
import Auth from "@/packages/auth";

import { TypePaginaPanel, TypeDatosFormPanel } from "@/components/types";

export default defineComponent({
  name: "PanelComponent",
  setup(props, { attrs }) {
    const showModal = ref(false);
    const showModalLista = ref(false);
    const datosForm = reactive({
      id: "",
      name: "",
      pageId: "",
      text: "",
      visible: false
    });
    const formUpdate = reactive({
      id: "",
      name: "",
      pageId: "",
      text: "",
      visible: false
    });

    const options = ref<TypePaginaPanel[]>([]);
    const tipos = reactive([
      { id: "string", name: "String" },
      { id: "file", name: "File" }
    ]);
    const isUpdate = ref(false);

    const paginaAgregada = (pagina: TypePaginaPanel) => {
      const $alerta = new Alerta();
      $alerta.success(
        "Se agregó una página",
        "Nombre de la página:<b>" + pagina.name + "</b>"
      );
      const data: TypePaginaPanel = { id: pagina.id, name: pagina.name };
      options.value.push(data);
    };
    const contenidoSeleccionado = (item: TypeDatosFormPanel) => {
      datosForm.id = item.id;
      datosForm.name = item.name;
      datosForm.pageId = item.page_id;
      datosForm.text = item.text;
      datosForm.visible = item.visible;

      formUpdate.id = item.id;
      formUpdate.name = item.name;
      formUpdate.pageId = item.page_id;
      formUpdate.text = item.text;
      formUpdate.visible = item.visible;

      showModalLista.value = false;
    };
    const deletePage = () => {
      const auth = new Auth();
      const token = auth.getToken();
      const $alerta = new Alerta();
      fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/pages/delete`, {
        method: "POST",
        body: JSON.stringify({ id: datosForm.pageId }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(response => {
          if (response.ok) {
            $alerta.success("Panel", "Se borró el elemento");
            options.value = options.value.filter(
              (elem: TypePaginaPanel) => elem.id !== datosForm.pageId
            );
          }
          if (response.error) {
            $alerta.error("Panel", response.error);
          }
        })
        .catch(error => $alerta.error("Error", "Ocurrió un error"));
    };
    const submit = () => {
      // actualizamos un contenido
      const auth = new Auth();
      const token = auth.getToken();
      const $alerta = new Alerta();
      if (token !== null) {
        if (
          formUpdate.name != "" &&
          formUpdate.pageId == datosForm.pageId &&
          formUpdate.name == datosForm.name
        ) {
          fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/contents/`, {
            method: "POST",
            body: JSON.stringify({ ...datosForm, _method: "PUT" }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.getToken()}`
            }
          })
            .then(response => response.json())
            .then(response => {
              if (response.id) {
                $alerta.success(
                  "Panel",
                  "se realizó la operación correctamente"
                );
              } else {
                $alerta.warning("Panel", "No pudo confirmarse la operación");
              }
            })
            .catch(e => $alerta.error("Panel", "Ocurrió un error inesperado"));
        } else {
          // damos de alta un contenido
          fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/contents/`, {
            method: "POST",
            body: JSON.stringify(datosForm),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          })
            .then(response => response.json())
            .then(response => {
              if (response.id) {
                $alerta.success(
                  "Panel",
                  "se realizó la operación correctamente"
                );
              } else {
                $alerta.warning("Panel", "No pudo confirmarse la operación");
              }
            })
            .catch(e => $alerta.error("Panel", "Ocurrió un error inesperado"));
        }
      } else {
        $alerta.warning("Login", "Se cerró la sesión");
      }
    };
    const getData = () => {
      fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/pages/`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(response => {
          options.value = response;
          datosForm.pageId = options.value[0].id;
        })
        .catch(e => console.error("Panel", "Ocurrió un error inesperado"));
    };

    getData();
    return {
      showModal,
      showModalLista,
      datosForm,
      formUpdate,
      options,
      tipos,
      isUpdate,
      // methods
      paginaAgregada,
      contenidoSeleccionado,
      submit,
      deletePage
    };
  },

  components: {
    ModalPage,
    ModalContents
  }
});
</script>
