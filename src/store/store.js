import { createStore } from "vuex";
import requestsModule from "./requests/index.js";
import authModule from './auth/index.js';
import coachesModule from './coaches/index.js';

const store = createStore({
    modules: {
        coaches: coachesModule,
        auth: authModule,
        reqests: requestsModule
    },
})

export default store;