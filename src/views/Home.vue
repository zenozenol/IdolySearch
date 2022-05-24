<template>
  <div class="top">
    <Home />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Home from "@/components/Home.vue";

export default {
  name: "home",
  components: {
    Home
  },
  head: {
    meta: [
      {
        name: "viewport",
        content: "width=375,initial-scale=1.0,user-scalable=yes"
      },
      { charset: "utf-8" }
    ],
    title: { inner: "Home", separator: "|", complement: "IDOLY SEARCH" },
    link: [
      {
        rel: "icon",
        href: "./images/favicon.ico",
        type: "image/x-icon"
      }
    ]
  }
};
</script>
