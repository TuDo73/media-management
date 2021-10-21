<template>
  <div class="login-wrapper">
    <div class="login-form-wrap">
      <form class="login-form validate-form" @submit.prevent="login">
        <span class="login-form-title">
          Login
        </span>
        <div class="wrap-input-login validate-input">
          <input
            class="input-login"
            type="text"
            placeholder="Domain"
            v-model="domain"
          />
          <span class="focus-input-login"></span>
        </div>
        <div class="wrap-input-login validate-input">
          <input
            class="input-login"
            type="password"
            placeholder="Token"
            v-model="token"
          />
          <span class="focus-input-login"></span>
        </div>
        <div class="login-btn-wrap">
          <button class="login-btn" type="submit">
            Login
          </button>
        </div>
      </form>
      <div class="login-error" v-if="isLoginFalse">
        Authorization has been denied for this request!
      </div>
    </div>
  </div>
</template>
<script>
import { globalFunction } from "@/global/global.js";
import { mapState } from "vuex";
import System from "@/services/System";

export default {
  components: {},

  computed: {
    ...mapState({}),
  },

  data() {
    return {
      domain: "",
      token: "",
      isLoginFalse: false,
    };
  },

  methods: {
    login() {
      let loginData = {
        Domain: this.domain,
        Authorization: this.token,
      };
      JSON.stringify(loginData);
      globalFunction.storeToLocalStorage("login", loginData);

      System.getAll().then((res) => {
        if (res.status === 401) {
          this.isLoginFalse = true;
        } else if (res.status === 200) {
          this.$router.push({ path: "/home" });
        }
      });
    },
  },

  created() {
    globalFunction.removeLocalStorageItem("login");
  },
};
</script>

<style lang="scss"></style>
