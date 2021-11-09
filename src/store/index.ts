import axios from "axios";
import { createStore } from "vuex";
import { ref, reactive } from '@vue/reactivity'

interface State {
  status: string,
  accessToken: string,
  refreshToken: string,
}

const state = reactive<State>({
  status: localStorage.getItem('token')!='' ? 'succes' : '' as string,
  accessToken: localStorage.getItem('token') || '' as string,
  refreshToken: localStorage.getItem('refresh_token') || '' as string
})

export default createStore({
  state: state,
  getters:{
    isLoggedIn: state => !!state.accessToken,
    authStatus: state => state.status
  },
  mutations: {
    auth_request(state: State){
      state.status = 'loading';
    },
    auth_success(state: State, data: any){
      state.status = 'success';
      state.accessToken = data.accessToken;
      state.refreshToken = data.refreshToken;
    },
    auth_error(state: State){
      state.status = 'error';
    },
    logout(state: State){
      state.status = '';
      state.accessToken = '';
      state.refreshToken = '';
    }
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios.post("auth/jwt/create/", user)
        .then(resp => {
          const data: any = resp.data;
          const accessToken: string = data.access;
          const refreshToken: string = data.refresh;
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
          axios.defaults.headers.common['Authorization'] = "Bearer " + accessToken
          commit('auth_success', {accessToken, refreshToken})
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          localStorage.removeItem('token')
          reject(err)
        })
      })
    },
    registration({commit}, user){
      return new Promise((resolve, reject) =>{
        commit('auth_request');
        axios.post("/auth/users/", user)
        .then(resp =>{
          resolve(resp)
        }
        )
        .catch(err => {
          commit('auth_error', err)
          reject(err)
        })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) =>{
        commit('logout');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        delete axios.defaults.headers.common['Authorization']
        resolve(null)
      })
    }
  },
  modules: {},
});
