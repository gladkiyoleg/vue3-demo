<template>
  <div class="wrapper">
    <div>
      <auth-form @onSubmit="e => submitHandler(e)" :is-login="isLogin"/>
      <p v-if="isLogin">
        Switch from to <span class="link" @click="isLogin = !isLogin">sign up</span>
      </p>
      <p v-else>
        Switch from to <span class="link" @click="isLogin = !isLogin">login</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AuthForm from '@/components/AuthForm.vue';
import { AuthFormBody } from '@/types/authentication/AuthFormBody';
import { Ref } from '@/types/utils/Ref';

export default defineComponent({
  name: 'Login',
  components: { AuthForm },
  setup() {
    const isLogin = ref(true) as Ref<boolean>;

    return { isLogin };
  },
  methods: {
    submitHandler(e: AuthFormBody) {
      // eslint-disable-next-line no-console
      console.log('submitHandler', e);
    },
  },
});
</script>

<style scoped lang="scss">
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  }

  .link {
    color: blue;
    cursor: pointer;
  }
</style>
