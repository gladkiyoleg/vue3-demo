import { firebaseFirestore } from '@/firebase/config';

export type ChatFormBody = {
  email: string | null,
  displayName: string | null,
  createdAt: firebaseFirestore.FieldValue,
  message: string
}
