import { ref } from 'vue';
import { auth, firebaseAuth } from '@/firebase/config';
import { Ref } from '@/types/utils/Ref';

// eslint-disable-next-line max-len
export default function useLogout(): { error: Ref<string | undefined>, logout: () => Promise<void> } {
  const error: Ref<string | undefined> = ref();

  const logout = async (): Promise<void> => {
    error.value = '';
    try {
      await firebaseAuth.signOut(auth);
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    error,
    logout,
  };
}
