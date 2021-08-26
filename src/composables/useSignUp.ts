import { ref } from 'vue';
import { auth, firebaseAuth } from '@/firebase/config';
import { AuthFormBody } from '@/types/authentication/AuthFormBody';
import { Ref } from '@/types/utils/Ref';

// eslint-disable-next-line max-len
export default function useSignUp(): { error: Ref<string | undefined>, signUp: (data: AuthFormBody) => Promise<void> } {
  const error: Ref<string | undefined> = ref();

  const signUp = async (data: AuthFormBody): Promise<void> => {
    error.value = '';
    try {
      const res = await firebaseAuth.createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await firebaseAuth.updateProfile(res.user, { displayName: data.name });
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    error,
    signUp,
  };
}
