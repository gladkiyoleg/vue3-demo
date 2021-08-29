import { ref, Ref } from 'vue';
import { auth, firebaseAuth } from '@/firebase/config';
import { AuthFormBody } from '@/types/authentication/AuthFormBody';

export default function useLogin(): {
  error: Ref<string | undefined>,
  login: (data: AuthFormBody) => Promise<void>
  } {
  const error: Ref<string | undefined> = ref();

  const login = async (data: AuthFormBody): Promise<void> => {
    error.value = '';
    try {
      await firebaseAuth.signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    error,
    login,
  };
}
