import { ref, Ref, watchEffect } from 'vue';
import { firebaseFirestore, db } from '@/firebase/config';
import { ChatFormBody } from '@/types/chat/ChatFormBody';

export default function useCollection(collection: string): {
  error: Ref<string | null>,
  addDoc: (data: ChatFormBody) => Promise<void>
  messages: Ref<firebaseFirestore.DocumentData[] | null>
} {
  const error: Ref<string | null> = ref(null);
  const messages: Ref<firebaseFirestore.DocumentData[] | null> = ref(null);

  const addDoc = async (data: ChatFormBody) => {
    error.value = null;
    try {
      await firebaseFirestore.addDoc(
        firebaseFirestore.collection(db, collection),
        data,
      );
    } catch (err) {
      error.value = err.message;
    }
  };

  const unsub = firebaseFirestore.onSnapshot(
    firebaseFirestore.collection(db, collection),
    (snap) => {
      const results: firebaseFirestore.DocumentData[] = [];
      snap.forEach((s) => {
        if (s.data().createdAt) {
          results.push({ ...s.data() });
        }
        messages.value = results.sort((a, b) => a.createdAt - b.createdAt);
      });
    },
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return {
    error,
    addDoc,
    messages,
  };
}
