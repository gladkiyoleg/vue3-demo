<template>
  <form @submit.prevent="submit">
    <label>
      <textarea
        class="textarea"
        v-model="message"
        placeholder="Your message"
        @keypress.prevent.enter="submit"
      />
    </label>
  </form>
</template>

<script lang="ts">
import { ref, Ref } from 'vue';
import { firebaseFirestore } from '@/firebase/config';
import { ChatFormBody } from '@/types/chat/ChatFormBody';
import useCollection from '@/composables/useCollection';
import useUser from '@/composables/useUser';

export default {
  name: 'ChatForm',
  setup(): {
    submit: () => Promise<void>,
    message: Ref<string>
    } {
    const { user } = useUser();
    const { error, addDoc } = useCollection('messages');
    const message: Ref<string> = ref('');
    const submit = async () => {
      if (message.value.trim() && user) {
        const data: ChatFormBody = {
          email: user.email,
          displayName: user.displayName,
          message: message.value,
          timestamp: firebaseFirestore.serverTimestamp(),
        };
        await addDoc(data);
        if (!error.value) {
          message.value = '';
        }
      }
    };

    return {
      message,
      submit,
    };
  },
};
</script>

<style scoped lang="scss">
  .textarea {
    max-width: 620px;
    width: 100%;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 6px 12px;
    resize: none;
  }
</style>
