import { ref } from 'vue';
import { auth, firebaseAuth } from '@/firebase/config';
import { Ref } from '@/types/utils/Ref';
import { User } from '@/types/user/User';

export default function useUser(): {user: User | null} {
  const user: Ref<User | null> = ref(auth.currentUser);

  firebaseAuth.onAuthStateChanged(auth, (_user) => {
    if (_user) {
      user.value = {
        email: _user.email,
        displayName: _user.displayName,
      };
    } else {
      user.value = null;
    }
  });

  return {
    user: user.value,
  };
}
