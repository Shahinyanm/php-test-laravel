import axios from 'axios'
import * as types from '../mutation-types'

// state
export const state = {
  employees: []
}

// getters
export const getters = {
  employees: state => state.employees
}

// mutations
export const mutations = {
  [types.SET_EMPLOYEES] (sate, { data }) {
    state.employees = data
  },
  [types.DELETE_EMPLOYEE] (sate, id) {
    const index = state.employees.findIndex(e => e.id === id)
    state.employees.splice(index, 1)
  }
}

// actions
export const actions = {
  async  getEmployees ({ commit }, page) {
    const { data } = await axios.get('/employees', {
      params: {
        page
      }
    })
    commit(types.SET_EMPLOYEES, data)
    return data
  },
  async  getEmployee (_, id) {
    const { data } = await axios.get('/employees/' + id)
    return data
  },
  async  deleteEmployee ({ commit }, id) {
    const { data } = await axios.delete('/employees/' + id)
    commit(types.DELETE_EMPLOYEE, id)
    return data
  },
  async  createEmployee (_, details) {
    const { data } = await axios.post('/employees', details)
    return data
  }
}
