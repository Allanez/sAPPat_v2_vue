import { createStore } from "vuex"

export default createStore({
    state: {
        isAuthenticated: false,
        role: "",
    },

    mutations: {
        setAuthentication(state, status){
            state.isAuthenticated = status
        },
        setRole(state, role){
            state.role = role
        },
    },

    actions: {
        async loginUser( {commit}, user ){
            //Temp token
            localStorage.setItem("access_token", "temp_token")
            commit('setAuthentication', true)
            //Temp role
            commit('setRole', "Value Chain Data Analyst")
            window.location.replace("/home/" + user.username)

            
            
        },
        logoutUser({commit}) {
            localStorage.removeItem("access_token")
            commit('setAuthentication', false)
            window.location.replace("/login")
        },
    },

    getters: {
        isAuthenticated: () => () => {
            return localStorage.getItem("access_token") != null
        },
        getRole: (state) => () => {
            return state.role
        }
    }
})