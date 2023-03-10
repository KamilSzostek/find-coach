import { createStore } from "vuex";
import requestsModule from "./requests/index.js";
import axios from "axios";

const store = createStore({
    modules: {
        reqests: requestsModule
    },
    state() {
        return {
            coaches: [],
            filteredCoaches: [],
            selectedCoach: null,
        }
    },
    getters: {
        getCoaches(state) {
            return state.filteredCoaches.length > 0 ? state.filteredCoaches : state.coaches;
        },
        getCoach(state) {
            return state.selectedCoach
        }
    },
    mutations: {
        fetchCoaches(state, payload) {
            state.coaches = payload;
        },
        selectCoach(state, id) {
            state.selectedCoach = state.coaches.find((coach) => coach.id == id);
        },
        addCoach(_, payload) {
            axios.post('https://find-coach-9f124-default-rtdb.europe-west1.firebasedatabase.app/coaches.json', payload)
        },
        setFilteredCoaches(state, payload) {
            state.filteredCoaches = state.coaches.filter(coach => {
                let counter = 0;
                for (const area of payload) {
                    if (coach.areas.includes(area))
                        counter++
                }
                if (counter === payload.length)
                    return coach
            })
        },
    },
    actions: {
        fetchCoaches(context, payload) {
            context.commit('fetchCoaches', payload)
        },
        selectCoach(context, payload) {
            context.commit('selectCoach', payload)
        },
        addCoach(context, payload) {
            context.commit('addCoach', payload)
        },
        setFilteredCoaches(context, payload) {
            context.commit('setFilteredCoaches', payload)
        },
    }
})

export default store;