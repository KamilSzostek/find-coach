import router from '../../router/index.js'

let timer = 0;
export default {
    state() {
        return {
            userId: null,
            token: null,
            tokenExpiration: null,
            logout: false
        }
    },
    getters: {
        userId(state) {
            return state.userId
        },
        getToken(state) {
            return state.token
        },
        getAuthentication(state) {
            return state.token;
        },
        autoLogout(state) {
            return state.logout;
        }
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token
            state.userId = payload.userId
            state.tokenExpiration = payload.tokenExpiration
        },
        setAutoLogout(state, payload) {
            state.logout = payload
        }
    },
    actions: {
        async login(context, payload) {
            context.dispatch('auth', {
                ...payload,
                mode: 'login'
            })
        },
        async sign(context, payload) {
            context.dispatch('auth', {
                ...payload,
                mode: 'sign'
            })
        },
        async auth(context, payload) {
            const mode = payload.mode;
            let authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_q3JW2IJlBAeqp-TleGJv31zohQbsx_A';
            if (mode === 'login')
                authURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_q3JW2IJlBAeqp-TleGJv31zohQbsx_A';

            const response = await fetch(authURL, {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            })
            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to authenticate.')
                throw error
            }
            const expiresIn = +responseData.expiresIn * 1000
            const expirationDate = new Date().getTime() + expiresIn;

            localStorage.setItem('token', responseData.idToken)
            localStorage.setItem('userId', responseData.userId)
            localStorage.setItem('tokenExpiration', expirationDate)

            timer = setTimeout(() => {
                context.commit('setAutoLogout', true)
                context.dispatch('signout')
            }, expiresIn)

            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId,
            })

        },
        tryLogin(context) {
            const token = localStorage.getItem('token')
            const userId = localStorage.getItem('userId')
            const expirationDate = localStorage.getItem('expirationDate')

            const expiresIn = expirationDate - new Date().getTime()
            timer = setTimeout(() => {
                context.commit('setAutoLogout', true)
                context.dispatch('signout')
            }, expiresIn)

            if (token && userId) {
                context.commit('setUser', {
                    token,
                    userId,
                })
            }
        },
        signout(context) {
            clearTimeout(timer)
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('expirationDate')
            context.commit('setUser', {
                token: null,
                userId: null,
            })
            if (context.getters.autoLogout) {
                router.replace('/coaches')
                context.commit('setAutoLogout', false)
            }
        }
    }
}