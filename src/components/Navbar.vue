<template>
  <div class="container" v-if="user">
    <span>Hello, {{ user.displayName }}</span>
    <button class="button" @click="logoutHandler">Log out</button>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import useLogout from '@/composables/useLogout';
import useUser from '@/composables/useUser';

export default {
  name: 'Navbar',
  setup() {
    const { error, logout } = useLogout();
    const { user } = useUser();
    const router = useRouter();

    const logoutHandler = async () => {
      await logout();
      if (!error.value) {
        await router.push('/login');
      }
    };
    return {
      user,
      logoutHandler,
    };
  },
};
</script>

<style scoped lang="scss">
  .container {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 6px;
    background: #cacaca;
  }

  .button {
    width: 80px;
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
