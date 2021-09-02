<template>
  <div class="header">
    Chat
  </div>
  <div v-if="messages" class="container">
    <div v-for="(message, i) in messages"
         :key="i"
         class="message-wrapper"
         :class="{'message-wrapper__your': message.email === user.email}"
    >
      <div class="message-container">
        <span class="message">{{ message.message }}</span>
      </div>
      <div>
        <span class="name">{{ message.displayName }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Ref } from 'vue';
import { firebaseFirestore } from '@/firebase/config';
import { User } from '@/types/user/User';
import useCollection from '@/composables/useCollection';
import useUser from '@/composables/useUser';

export default {
  name: 'ChatMessagesContainer',
  setup(): {
      messages: Ref<firebaseFirestore.DocumentData[] | null>,
      user: User | null
      } {
    const { messages } = useCollection('messages');
    const { user } = useUser();

    return {
      messages,
      user,
    };
  },
};
</script>

<style lang="scss" scoped>
  .container {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 620px;
    width: 100%;
    height: 400px;
    padding: 12px 24px;
    margin: 0 auto 10px;
    overflow-y: scroll;
    background-color: #fff;
    border-radius: 0 0 5px 5px;
    box-shadow: 0px 1px 15px 1px rgb(0 0 0 / 30%);
  }

  .header {
    background: #42a7a1;
    padding: 20px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    max-width: 620px;
    margin: 0 auto;
    color: #fff;
    font-weight: 500;
    box-shadow: 0px 1px 15px 1px rgb(0 0 0 / 30%);
  }

  .message-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &.message-wrapper__your {
      align-items: flex-end;

      .message-container {
        border-radius: 16px 16px 2px 16px;
        background-color: #f6f6f6;
      }
    }
  }

  .message-container {
    display: flex;
    width: 80%;
    border: 1px solid #ccc;
    border-radius: 16px 16px 16px 2px;
    padding: 4px 10px;

    .message {
      color: #000;
      font-size: 15px;
      text-align: left;
    }
  }

  .name {
    color: rgba(0,0,0,.5);
    font-weight: 500;
    font-size: 11px;
  }
</style>
