import { db } from 'boot/firebase';
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  startAfter,
  limit,
  setDoc,
  increment,
} from 'firebase/firestore';
import { getUserById } from './user';

export async function createPost(data) {
  const docRef = await addDoc(collection(db, 'posts'), {
    ...data,
    readCount: 0,
    likeCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getPost(params) {
  console.log('###params:', params);

  const conditions = [];
  if (params?.category) {
    conditions.push(where('category', '==', params?.category));
  }
  if (params?.tags && params?.tags.length > 0) {
    conditions.push(where('tags', 'array-contains-any', params?.tags));
  }

  if (params?.sort) {
    conditions.push(orderBy(params.sort, 'desc'));
  }

  if (params?.start) {
    conditions.push(startAfter(params.start));
  }

  if (params?.limit) {
    conditions.push(limit(params.limit));
  }

  const q = query(collection(db, 'posts'), ...conditions);
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(docs => {
    const data = docs.data();
    return {
      ...data,
      id: docs.id,
      createdAt: data.createdAt?.toDate(),
    };
  });
  const latesDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
  return {
    items: posts,
    lastItem: latesDoc,
  };
}

export async function getPost_(id) {
  const docSnap = await getDoc(doc(db, 'posts', id));

  if (!docSnap.exists()) {
    throw new Error('No such document!');
  }

  const data = docSnap.data();

  return {
    id: docSnap.id,
    ...data,
    createdAt: data.createdAt?.toDate(),
  };
}

async function incrementReadCount(id) {
  await updateDoc(doc(db, 'posts', id), { readCount: increment(1) });
}

export async function getPostDetails(id) {
  await incrementReadCount(id);
  const post = await getPost_(id); // post.uid
  const postUser = await getUserById(post.uid);
  return {
    post,
    postUser,
  };
}

export async function updatePost(id, data) {
  await updateDoc(doc(db, 'posts', id), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deletePost(id) {
  await deleteDoc(doc(db, 'posts', id));
}

/**
 *  1) 게시글 좋아요
 *  2) 게시글 좋아요 취소
 *  3) 게시글 좋아요 조회
 */

export async function addLike(uid, postId) {
  await setDoc(doc(db, 'post_likes', `${uid}_${postId}`), {
    uid,
    postId,
    createdAt: serverTimestamp(),
  });
}

export async function removeLike(uid, postId) {
  await deleteDoc(doc(db, 'post_likes', `${uid}_${postId}`));
}

export async function hasLike(uid, postId) {
  const docSnap = await getDoc(doc(db, 'post_likes', `${uid}_${postId}`));
  return docSnap.exists();
}

export async function addBookmark(uid, postId) {
  setDoc(doc(db, 'users', uid, 'bookmarks', postId), {
    createdAt: serverTimestamp(),
  });
}

export async function removeBookmark(uid, postId) {
  await deleteDoc(doc(db, 'users', uid, 'bookmarks', postId));
}

export async function hasBookmark(uid, postId) {
  const docSnap = await getDoc(doc(db, 'users', uid, 'bookmarks', postId));
  return docSnap.exists();
}

export async function getUserBookmarks(uid) {
  const q = query(
    collection(db, 'users', uid, 'bookmarks'),
    orderBy('createdAt', 'desc'),
    limit(6),
  );
  const querySnapshot = await getDocs(q);

  return Promise.all(
    querySnapshot.docs.map(bookmarkDoc => getPost_(bookmarkDoc.id)),
  );
}

export async function getTags() {
  const q = query(
    collection(db, 'tags'),
    where('count', '>', 0),
    orderBy('count', 'desc'),
  );
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docu => docu.data());
}
