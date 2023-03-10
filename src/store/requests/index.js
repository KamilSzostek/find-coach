import axios from "axios";
export default {
    state() {
        return {
            requests: []
        }
    },
    getters: {
        getRequests(state) {
            return state.requests;
        }
    },
    mutations: {
        setRequests(state, payload) {
            state.requests = payload
        },
        addRequest(_, payload) {
            axios.post("https://find-coach-9f124-default-rtdb.europe-west1.firebasedatabase.app/requests.json", payload)
        }
    },
    actions: {
        setRequests(context, payload) {
            context.commit('setRequests', payload)
        },
        addRequest(context, payload) {
            context.commit('addRequest', payload)
        },
    }
}