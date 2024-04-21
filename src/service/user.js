import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/boot/firebase';

export async function getUserById(id) {
  const docSnap = await getDoc(doc(db, 'users', id));
  if (docSnap.exists()) {
    const data = docSnap.data();

    return {
      id,
      ...data,
      createdAt: data.createdAt.toDate(),
    };
  }
  return null;
}
