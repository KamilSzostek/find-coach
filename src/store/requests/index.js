import axios from "axios";
export default {
    state() {
        return {
            requests: [],
            error: ''
        }
    },
    getters: {
        getRequests(state) {
            return state.requests;
        },
        getError(state) {
            return state.error
        }

    },
    mutations: {
        setRequests(state, payload) {
            state.requests = payload
        },
        setError(state, payload) {
            state.error = payload
        }
    },
    actions: {
        async setRequests(context) {
            const token = context.rootGetters.getToken
            await axios
                .get(
                    `https://find-coach-9f124-default-rtdb.europe-west1.firebasedatabase.app/requests.json?auth=${token}`
                )
                .then((response) => {
                    if (response.status === 200) {
                        context.commit('setRequests', response.data)
                    }
                })
                .catch((err) => {
                    context.commit('setError', err.response.statusText)
                });
        },
        addRequest(context, payload) {
            axios.post("https://find-coach-9f124-default-rtdb.europe-west1.firebasedatabase.app/requests.json", payload)
            context.commit('addRequest', ...payload)
        },
    }
}