import { createStore } from "vuex"

export default createStore({
    state: {
        isAuthenticated: false,
        role: "",
        breadcrumbs: [],
    },

    mutations: {
        setAuthentication(state, status){
            state.isAuthenticated = status
        },
        setRole(state, role){
            state.role = role
        },
        setBreadcrumb(state, crumb){
            state.breadcrumbs.push(crumb)
        },
        setCrumbActive(state, name){
            for(let i=0; i<state.breadcrumbs.length; i++){
                if(state.breadcrumbs[i].title === name){
                    state.breadcrumbs[i].disabled = false
                    break;
                }
            }
        }
    },

    actions: {
        async loginUser( {commit}, user ){
            //Temp token
            localStorage.setItem("access_token", "temp_token")
            localStorage.setItem("user_name", user.username)
            commit('setAuthentication', true)
            //Temp role
            commit('setRole', "Value Chain Data Analyst")
            window.location.replace("/home")

            
            
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
        },
        getUsername: () => () => {

        },
        getBreadcrumbs: (state) => () => {
            return state.breadcrumbs
        }
    }
})