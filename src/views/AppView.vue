<template lang="">
  <RouterView></RouterView>
 <Header></Header>

      <slot></slot>

<Footer></Footer>
</template>
<script>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
export default {
    components: {
        Header,
        Footer,
    }
};
</script>
<style lang=""></style>
