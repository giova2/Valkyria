<template>
  <div
    class="w-full form-contact-wrapper pl-auto md:pl-4 -mt-10 flex justify-start items-center h-screen"
  >
    <Loading v-if="aviso" />
    <!-- -mt10 porque tenemos que el componente superior tiene 10 de padding superior  -->
    <form class="w-full max-w-lg" @submit.prevent="onCaptchaVerify">
      <div class="mb-6 text-center text-white text-3xl">
        <h1>Contacto</h1>
      </div>
      <div class="w-full px-3 mb-4 md:mb-0">
        <input
          class="form-field"
          :class="error.nombre ? 'error' : ''"
          id="grid-nombre"
          name="nombre"
          v-model="contacto.nombre"
          placeholder="Su Nombre (*)"
          type="text"
        />
        <p v-show="error.nombre" class="text-red-500 text-xs italic">
          Su nombre.
        </p>
      </div>
      <div class="w-full px-3">
        <input
          class="form-field"
          :class="error.email ? 'error' : ''"
          id="grid-email"
          name="email"
          v-model="contacto.email"
          type="email"
          placeholder="Email (*)"
        />
        <p v-show="error.email" class="text-red-500 text-xs italic">
          Su e-mail.
        </p>
      </div>
      <div class="w-full px-3">
        <input
          class="form-field"
          :class="error.asunto ? 'error' : ''"
          id="grid-asunto"
          name="asunto"
          v-model="contacto.asunto"
          type="text"
          placeholder=" Asunto"
        />
        <p v-show="error.asunto" class="text-red-500 text-xs italic">Asunto.</p>
      </div>
      <div class="w-full px-3">
        <textarea
          id="grid-mensaje"
          class="form-field mb-2"
          :class="error.mensaje ? 'error' : ''"
          name="mensaje"
          v-model="contacto.mensaje"
          placeholder="Ingresa tu consulta aquí (*)"
          rows="4"
        ></textarea>
        <p v-show="error.mensaje" class="text-red-500 text-xs italic">
          Mensaje.
        </p>
      </div>
      <!-- <hr /> -->
      <input type="hidden" v-model="fishing" />
      <div class="flex justify-center mt-2">
        <input
          class="valk-button"
          :data-sitekey="rcaptchaSigKey"
          :data-callback="onCaptchaVerify"
          type="submit"
          value="Enviar"
        />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import Alerta from "@/packages/alerta";
import VueRecaptcha from "vue-recaptcha";
import Loading from "../Loading.vue";
// import { ValidationProvider } from "vee-validate/dist/vee-validate.full.min";
// import { ValidationObserver, ValidationProvider } from "vee-validate";

export default defineComponent({
  name: "ContactoComponent",
  setup() {
    const fishing = ref("");
    const contacto = reactive({
      nombre: "",
      email: "",
      asunto: "",
      mensaje: "",
    });
    const error = reactive({
      nombre: false,
      email: false,
      asunto: false,
      mensaje: false,
    });
    const aviso = ref(false);
    const rcaptchaSigKey = ref("6LeqkcsZAAAAAMcRTTo10qgTN0w_V34IzsGz7HHl");

    const validate = () => {
      error.nombre = false;
      error.email = false;
      error.asunto = false;
      error.mensaje = false;
      if (contacto.nombre === "") {
        error.nombre = true;
        return false;
      }
      if (contacto.email === "") {
        error.email = true;
        return false;
      }
      if (contacto.asunto === "") {
        error.asunto = true;
        return false;
      }
      if (contacto.mensaje === "") {
        error.mensaje = true;
        return false;
      }
      if (fishing.value !== "") {
        return false;
      }
      return true;
    };

    const onCaptchaVerify = (token: string | undefined | null) => {
      if (validate()) {
        aviso.value = true;
        const verify = { response: token };
        const $alerta = new Alerta();
        if (!token) {
          $alerta.error("Captcha", "No pasó el desafío Recaptcha");
          aviso.value = false;
        } else {
          const datos = { contacto: contacto, captcha: verify };
          fetch(`${process.env.VUE_APP_LARAVEL_API_URL}api/mails/contacto`, {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((response) => {
              $alerta.success(
                "Enviado!",
                "El mensaje fue enviado correctamente"
              );
              aviso.value = false;
            })
            .catch((err) => {
              $alerta.error(
                "Hay errores",
                "Error al enviar, intentelo nuevamente"
              );
              aviso.value = false;
            });
        }
      }
    };
    const enviar = () => {
      // window.grecaptcha.ready(() => {
      //   window.grecaptcha.execute(rcaptchaSigKey.value);
      // });
    };

    return {
      contacto,
      error,
      aviso,
      rcaptchaSigKey,
      fishing,
      //methods
      onCaptchaVerify,
      enviar,
    };
  },

  components: {
    Loading,
    // VueRecaptcha
    // ValidationObserver,
    // ValidationProvider
  },
});
</script>
