import { db } from 'src/boot/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

export async function addComment(postId, data) {
  const docRef = await addDoc(collection(db, 'posts', postId, 'comments'), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getComments(postId) {
  const q = query(
    collection(db, 'posts', postId, 'comments'),
    orderBy('createdAt', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(docu => {
    const data = docu.data();
    return {
      id: docu.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
    };
  });
}

export async function deleteComment(postId, commentId) {
  await deleteDoc(doc(db, 'posts', postId, 'comments', commentId));
}
