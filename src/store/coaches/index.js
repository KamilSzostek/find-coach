import axios from "axios";
export default {
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
            const activeUserId = context.rootGetters.userId
            const token = context.rootGetters.getToken
            axios.put(`https://find-coach-9f124-default-rtdb.europe-west1.firebasedatabase.app/coaches/${activeUserId}.json?auth=${token}`, {
                id: activeUserId,
                firstName: payload.firstName,
                lastName: payload.lastName,
                areas: payload.areas,
                description: payload.description,
                hourlyRate: payload.hourlyRate,
            })
        },
        setFilteredCoaches(context, payload) {
            context.commit('setFilteredCoaches', payload)
        },
    }
}