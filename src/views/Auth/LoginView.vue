<template lang="">
  <div class="login-page">
    <div class="login-card">
      <div class="text-center">
        <img src="/img/lock.png" alt="" class="login-card__icon" />
        <h2>User Login</h2>
      </div>

      <form action="" @submit.prevent="handelSubmit">
        <div class="mt-1">
          <label for="email" class="block">Email:</label>
          <input
            v-model="formData.email"
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
          />
        </div>
        <div class="mt-3">
          <label for="password" class="block">Password:</label>
          <input
            v-model="formData.password"
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            ref="password"
          />
        </div>

        <!-- <p class="text-center mt-3" v-if="loggingIn">Logging.......</p>
        <button type="submit" class="w-100 login-btn" v-else>Login</button> -->

        <TheButton :block="true" :loading="loggingIn" class="mt-3">
          Login
        </TheButton>

        <div class="d-flex jc-between">
          <div class="">
            <label for="checkbox">
              <input type="checkbox" name="checkbox" id="checkbox" /> Remember
              me
            </label>
          </div>
          <div class="">
            <a href="#">Forgot Password</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import TheButton from "../components/TheButton.vue";
import { eventBus } from "../utils/eventBus";
import { showErrorMessage } from "../utils/function";
import { setPrivateHeaders } from "../service/axiosInstance";
export default {
  data: () => ({
    formData: {
      email: "",
      password: "",
    },
    loggingIn: false,
  }),
  methods: {
    handelSubmit() {
      // console.log(this.formData);
      if (!this.formData.email) {
        //alert("Email can not be empty");
        // TODO : show error message no toast

        showErrorMessage("Error", "Email can not be empty");
        return;
      }

      if (!this.formData.password) {
        //alert("password can not be empty");
        // TODO : show error message no toast

        showErrorMessage("Error", "Password can not be empty");

        return;
      }
      if (this.formData.password.length < 6) {
        //alert("password must be at least 6 characters");
        // TODO : show error message no toast

        showErrorMessage("Error", "Password must be at least 6 characters");

        this.$refs.password.focus();
        return;
      }
      if (this.formData.password.length > 16) {
        //alert("password must be maximum 16 characters");
        // TODO : show error message no toast

        showErrorMessage("Error", "Password must be maximum 16 characters");

        this.$refs.password.focus();
        return;
      }

      //call api

      this.loggingIn = true;
      axios
        .post("http://127.0.0.1:8000/api/v1/login", this.formData)
        .then((res) => {
          // after successfully login toaster

          showErrorMessage("Success", res.data.message);

          // set access_token data in local storage
          localStorage.setItem("accessToken", res.data.access_token);
          setPrivateHeaders();
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          // if get any error using login from
          // console.log(err);

          showErrorMessage("Error", "Something went wrong! Try next time");
        })
        .finally(() => {
          this.loggingIn = false;
        });
    },
  },
  components: {
    TheButton,
  },
};
</script>
<style>
.login-btn {
  background: linear-gradient(45deg, #ff6b6b, #ff6b6b, #ff914d, #ffc75f);
  border: none;
  border-radius: 3px;
  color: #fff;
  font-size: 16px;
  height: 33px;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  margin: 10px 0px 10px 0px;
}

.login-btn:hover {
  /* background: linear-gradient(45deg, #ffc75f, #ff914d, #ff6b6b, #ff6b6b);
  transform: scale(1.05); */
}

.login-page {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(235, 235, 235);
}

.login-card {
  width: 400px;
  /* border: 1px solid gray; */
  min-height: 193px;
  box-shadow: 0px 2px 9px 4px #dfdfdf;
  background-color: #fff;
  border-radius: 5px;
  padding: 44px 33px;
}

.login-card input[type="email"],
.login-card input[type="password"] {
  width: 100%;
}

.login-card__icon {
  max-width: 77px;
}
</style>
