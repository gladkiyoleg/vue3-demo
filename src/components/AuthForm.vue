<template>
    <form @submit.prevent="submit" class="form">
      <h3>{{ isLogin ? 'Login' : 'Sign Up'}} form</h3>
      <div v-if="!isLogin" class="input-wrapper">
        <label for="name" class="label">Your name</label>
        <input
          id="name"
          type="text"
          class="input"
          v-model="name"
        />
      </div>
      <div class="input-wrapper">
        <label for="email" class="label">Email</label>
        <input
          id="email"
          type="text"
          class="input"
          v-model="email"
          required
        />
      </div>
      <div class="input-wrapper">
        <label for="password" class="label">Password</label>
        <input
          id="password"
          type="text"
          class="input"
          v-model="password"
          required
        />
      </div>
      <button class="button" type="submit" :disabled="isDisabled">
        Submit
      </button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';

export default defineComponent({
  name: 'AuthForm',
  emits: ['on-submit'],
  props: {
    isLogin: {
      type: Boolean,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const name: Ref<string> = ref('');
    const email: Ref<string> = ref('email@email.com');
    const password: Ref<string> = ref('123123');

    const submit = () => {
      if (props.isLogin) {
        emit('on-submit', {
          email: email.value.trim(),
          password: password.value.trim(),
        });
      } else {
        emit('on-submit', {
          email: email.value.trim(),
          password: password.value.trim(),
          name: name.value.trim(),
        });
      }
    };

    return {
      name, email, password, submit,
    };
  },
});
</script>

<style scoped lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    width: 420px;
    max-width: 100%;
    padding: 16px;
    box-shadow: 0px 5px 20px 2px rgb(0, 0, 0, .3);
    gap: 12px;
  }

  .input-wrapper {
    display: flex;
    align-items: center;

    .label {
      flex: 0 0 90px;
      text-align: left;
    }

    .input {
      width: 100%;
      padding: 6px;
    }
  }

  .button {
    width: 160px;
    margin: 0 auto;
    padding: 6px;
    background: #eeeeee;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
    transition: background .2s;

    &:hover {
      background: #b7b7b7;
    }
  }
</style>
