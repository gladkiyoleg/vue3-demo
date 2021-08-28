<template>
  <div class="wrapper">
    <div>
      <auth-form @onSubmit="e => submitHandler(e)" :is-login="isLogin" :is-disabled="isLoading"/>
      <p>{{errorLogin || errorSignUp}}</p>
      <p v-if="isLogin">
        Switch form to <span class="link" @click="isLogin = !isLogin">sign up</span>
      </p>
      <p v-else>
        Switch form to <span class="link" @click="isLogin = !isLogin">login</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthForm from '@/components/AuthForm.vue';
import { AuthFormBody } from '@/types/authentication/AuthFormBody';
import { Ref } from '@/types/utils/Ref';
import useSignUp from '@/composables/useSignUp';
import useLogin from '@/composables/useLogin';

export default defineComponent({
  name: 'Login',
  components: { AuthForm },
  setup() {
    const { error: errorSignUp, signUp } = useSignUp();
    const { error: errorLogin, login } = useLogin();
    const router = useRouter();
    const isLogin: Ref<boolean> = ref(true);
    const isLoading: Ref<boolean> = ref(false);

    const submitHandler = async (e: AuthFormBody) => {
      isLoading.value = true;
      if (isLogin.value) {
        await login(e);
        if (!errorLogin.value) {
          await router.push('/');
        }
      } else {
        await signUp(e);
        if (!errorSignUp.value) {
          await router.push('/');
        }
      }
      isLoading.value = false;
    };

    return {
      isLoading, isLogin, errorLogin, submitHandler, errorSignUp,
    };
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
