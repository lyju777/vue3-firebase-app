import { boot } from 'quasar/wrappers';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { useAuthStore } from 'src/stores/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyB3cckzrdsrnOSrXQ73yztoGPlLv2dxQjQ',
  authDomain: 'vue3-firevbase-app.firebaseapp.com',
  projectId: 'vue3-firevbase-app',
  storageBucket: 'vue3-firevbase-app.appspot.com',
  messagingSenderId: '277252619613',
  appId: '1:277252619613:web:30fe57ae3d6f06ed467cb4',
  measurementId: 'G-T3GHZ5DQQ6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

export default boot(async () => {
  const authStore = useAuthStore();
  onAuthStateChanged(auth, user => {
    console.log('### user', user);
    authStore.setUser(user);
  });
});
