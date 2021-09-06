<template>
  <div class="header">
    Chat
  </div>
  <div v-if="messages" class="container" ref="container">
    <div v-for="(message, i) in messages"
         :key="i"
         class="message-wrapper"
         :class="{'message-wrapper__your': message.email === user.email}"
    >
      <div>
        <span class="name">{{ message.email === user.email ? 'You' : message.displayName }}</span>
      </div>
      <div class="message-container">
        <div class="message">{{ message.message }}</div>
        <div class="date">{{ createdAt(message) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, onUpdated, ref } from 'vue';
import format from 'date-fns/format';
import { firebaseFirestore } from '@/firebase/config';
import { User } from '@/types/user/User';
import useCollection from '@/composables/useCollection';
import useUser from '@/composables/useUser';

export default {
  name: 'ChatMessagesContainer',
  setup(): {
      messages: Ref<firebaseFirestore.DocumentData[] | null>,
      user: User | null,
      container: Ref<HTMLElement | null>
      } {
    const { messages } = useCollection('messages');
    const { user } = useUser();
    const container: Ref<HTMLElement | null> = ref(null);

    onUpdated(() => {
      if (container.value) {
        container.value.scrollTop = container.value.scrollHeight;
      }
    });

    return {
      messages,
      user,
      container,
    };
  },
  methods: {
    createdAt(message: firebaseFirestore.DocumentData): string {
      return format(message.createdAt.toDate(), 'do LLL H:mm');
    },
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
        border-radius: 16px 0 16px 16px;
        background-color: #f6f6f6;
      }
    }
  }

  .message-container {
    display: flex;
    flex-direction: column;
    width: 65%;
    border: 1px solid #ccc;
    border-radius: 0 16px 16px 16px;
    padding: 4px 10px;

    .message {
      color: #000;
      font-size: 15px;
      text-align: left;
    }
  }

  .name {
    color: #000000;
    font-weight: 500;
    font-size: 11px;
  }

  .date {
    color: rgba(0,0,0,.5);
    font-size: 10px;
    text-align: right;
  }
</style>
