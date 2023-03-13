import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/store.js'
import DataLoading from "@/components/ui/DataLoading.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import ModalAlert from "@/components/ui/ModalAlert.vue";

const app = createApp(App)

app.use(store)
app.use(router)

app.component('DataLoading', DataLoading)
app.component('BaseButton', BaseButton)
app.component('ModalAlert', ModalAlert)

app.mount('#app')

