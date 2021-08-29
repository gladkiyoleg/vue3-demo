import { firebaseFirestore } from '@/firebase/config';

export type ChatFormBody = {
  email: string | null,
  displayName: string | null,
  timestamp: firebaseFirestore.FieldValue,
  message: string
}
