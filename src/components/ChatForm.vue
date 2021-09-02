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
          createdAt: firebaseFirestore.serverTimestamp(),
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
    border-radius: 25px;
    padding: 10px 16px;
    resize: none;
    height: 38px;
    outline: none;
    box-shadow: 0px 1px 15px 1px rgb(0 0 0 / 30%);
  }
</style>
