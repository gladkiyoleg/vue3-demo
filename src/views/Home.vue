<template>
  <navbar/>
  <div class="home">
    <h1>Home</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  name: 'Home',
  components: { Navbar },
});
</script>
