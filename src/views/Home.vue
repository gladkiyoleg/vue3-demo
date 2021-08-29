<template>
  <navbar/>
  <div class="home">
    <h1>Home</h1>
    <chat-form/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';
import ChatForm from '@/components/ChatForm.vue';

export default defineComponent({
  name: 'Home',
  components: {
    ChatForm,
    Navbar,
  },
});
</script>
