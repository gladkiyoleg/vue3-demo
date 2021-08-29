import { ref, Ref } from 'vue';
import { firebaseFirestore, db } from '@/firebase/config';
import { ChatFormBody } from '@/types/chat/ChatFormBody';

export default function useCollection(collection: string): {
  error: Ref<string | null>,
  addDoc: (data: ChatFormBody) => Promise<void>
} {
  const error: Ref<string | null> = ref(null);

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

  return {
    error,
    addDoc,
  };
}
