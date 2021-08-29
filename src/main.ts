import { createApp, ComponentPublicInstance } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { auth, firebaseAuth } from '@/firebase/config';

let app: ComponentPublicInstance;

firebaseAuth.onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(store).use(router).mount('#app');
  }
});
