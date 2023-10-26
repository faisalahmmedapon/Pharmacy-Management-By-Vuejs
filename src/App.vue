<template>
  <!-- <Login> </Login> -->
<router-view></router-view>
  <div class="toasts">
    <TheToast
      v-for="(toast, i) in toasts"
      :key="i"
      :toastType="toast.type"
      :message="toast.message"
    >
    </TheToast>
  </div>
</template>

<script>
// import Login from "./views/LoginView.vue";
import TheToast from "./components/TheToast.vue";

import {eventBus} from './utils/eventBus';

export default {
  data: () => ({
    toasts: [
      // {
      //   type: "Success",
      //   message: "Successfully Done!"
      // },
      // {
      //   type: "Error",
      //   message: "Something went wrong!"
      // },
    ],
  }),
  components: {
    // Login,
    TheToast,
  },
  mounted() {
    eventBus.on("toast", (data) => {
      this.toasts.push(data);
      // console.log(data);
      this.removeOneToast();
    });
  },
  methods:{
    removeOneToast(){
      setTimeout(()=>{
        this.toasts.shift();
      },1000);
    }
  }
};
</script>

<style scoped></style>
