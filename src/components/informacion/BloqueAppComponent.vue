<template>
  <div :class="classColor">
    <div class="text-white caja-texto invisible" :id="color" :ref="el => fadeInElements.push(el)">
      <p class="sm:text-xl md:text-2xl font-bold">{{ title }}</p>
      <p class="sm:text-lg md:text-xl">{{ body }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onUnmounted, onMounted } from "vue";

export default defineComponent({
  name: "BloqueAppComponent",
  props: {
    color: String,
    title: String,
    body: String
  },
  setup(props) {
    const classColor = `h-500 px-8 overflow-auto flex flex-wrap justify-center items-center text-center ${props.color}`;
    const fadeInElements = ref<Element[]>([]);
    const lastAnimation = ref("slideInRight");
    const lastElem = ref();

    const isElemVisible = (el: Element) => {
      const rect = el.getBoundingClientRect();
      const buffer = window.innerHeight / 2;
      const elemTop = rect.top > 0 ? rect.top + buffer : 0; // 200 = buffer
      const elemBottom = rect.bottom;
      return elemTop != 0 && elemTop < window.innerHeight && elemBottom >= 0;
    };
    // const handleScroll = (fadeInElements: Element[]) => {
    const handleScroll = () => {
      for (let i = 0; i < fadeInElements.value.length; i++) {
        const elem = fadeInElements.value[i];
        if (isElemVisible(elem) && lastElem.value != elem) {
          lastElem.value = elem;
          elem.classList.remove("invisible");
          elem.classList.add("animated");
          if (lastAnimation.value == "slideInRight") {
            elem.classList.add("slideInLeft");
            lastAnimation.value = "slideInLeft";
          } else {
            elem.classList.add("slideInRight");
            lastAnimation.value = "slideInRight";
          }
          fadeInElements.value.splice(i, 1); // only allow it to run once
        }
      }
    };
    const setScrollBehavior = () => {
      document.removeEventListener("scroll", handleScroll);
      const arr = window.document.querySelectorAll(".caja-texto");
      fadeInElements.value = Array.from(arr);
      document.addEventListener("scroll", handleScroll);
      handleScroll();
    };
    onUnmounted(() => {
      document.removeEventListener("scroll", handleScroll);
    });
    onMounted(() => {
      setScrollBehavior();
    });

    return {
      classColor,
      fadeInElements,
      //methods
      isElemVisible,
      handleScroll,
      setScrollBehavior
    };
  }
});
</script>

<style lang="scss">
.h-500 {
  min-height: 500px;
  max-height: 500px;
}

.violeta {
  background-color: rgba(86, 46, 205, 0.4); /* #562ecd; */
}

.blanco {
  background-color: rgba(255, 255, 255, 0.4); /*#ffffff;*/
  padding-top: 20px;
}

.rojo {
  background-color: rgba(206, 54, 53, 0.4); /* #ce3635; */
}
</style>
