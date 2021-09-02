<template>
  <navbar/>
  <div class="home">
    <chat-messages-container/>
    <chat-form/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import ChatForm from '@/components/ChatForm.vue';
import ChatMessagesContainer from '@/components/ChatMessagesContainer.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ChatMessagesContainer,
    ChatForm,
    Navbar,
  },
});
</script>

<style scoped lang="scss">
  .home {
    height: calc(100vh - 51px);
    background: #f9f8f9;
    padding: 20px;
  }
</style>
