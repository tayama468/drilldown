import { mount } from  '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import axios from 'axios'
import DrillDown from '../../components/DrillDown.vue'

Vue.use(Vuetify)
Vue.use(Vuex)

jest.mock('axios', () => ({
  $get: jest.fn((path, { params }) => {
    const res = makeResDataBy(params)
    return Promise.resolve(res)
  })
}))

const makeResDataBy = (params) => {
  const dummy = require('../../__mock__/api/drillDown/dummy.json')
  const res = {
    option2: null,
    option3: null
  }  
  const reqKeys = Object.keys(params)
  const resKeys = Object.keys(res)
  const reqLength = Object.keys(params).length
  const reqKey = reqKeys[reqLength - 1]
  const resKey = resKeys[reqLength - 1]
  const reqValue = params[reqKey]
  res[resKey] = dummy[reqValue]

  return res
}

const state = {
  drillDown: {
    option2: null,
    option3: null
  }
}


const actions = {
  'drillDown/fetch': jest.fn(async ({ commit }, params) => {
    const path = `/drillDown`
    axios.$get(path, {params: params})
      .then(res => {
        commit('SET', res)
      })
  })
}

const mutations = {
  SET(state, obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      if (obj[keys[i]]) {
        state.drillDown[keys[i]] = obj[keys[i]]
        break
      }
    }
  }
}

// cf. https://github.com/vuejs/vue-test-utils/issues/974#issuecomment-423721358
// [Vue warn]: Error in mounted hook: "ReferenceError: requestAnimationFrame is not defined"
global.requestAnimationFrame = (cb) => cb()

// This is temporary solution for remove warn below
// [Vue warn]: Error in directive click-outside inserted hook: "ReferenceError: ShadowRoot is not defined"
global.ShadowRoot = (cb) => cb()

// cf. https://github.com/vuejs/vue/issues/9698#issuecomment-473258879
// Attempted to log "[Vue warn]: Error in callback for watcher "listIndex": "ReferenceError: performance is not defined"
// eslint-disable-next-line no-undef
global.performance = window.performance;

describe('DrillDown component', () => {
  // NOTE: this code cause transition-stub do not function
  // const app = document.createElement('div')
  // app.setAttribute('data-app', true)
  // document.body.appendChild(app)

  let wrapper
  let vuetify
  let store

  beforeEach(() => {
    axios.$get.mockClear();
    vuetify = new Vuetify()
    store = new Vuex.Store({
      state,
      actions,
      mutations
    })
    wrapper = mount(DrillDown, {
      vuetify,
      store,
      propsData: {
        firstItems: [1, 2, 3],
        initialItem: {
          option1: '1',
          option2: '',
          option3: ''
        },
        path: 'drillDown/fetch'
      }
    })
  })

  it('have multiple slot', () => {
    const elm = wrapper.findAll('.v-input__slot')
    expect(elm.length > 1).toBe(true)
  })

  it('get options and initial value from parent Class', () => {
    const list = []
    const inputElms = wrapper.findAll('input')
    for (let i = 0; i < inputElms.length; i++) {
      if (inputElms.at(i).attributes().type !== 'hidden') continue
      if (inputElms.at(i).attributes().value) {
        list.push(inputElms.at(i).attributes().value)
        continue
      }
      list.push('')
    }
    const initialItem = wrapper.props().initialItem
    Object.keys(initialItem).forEach((item, index) => {
      expect(initialItem[item]).toBe(list[index])
    })
  })

  it('is selected in order', () => {
    const selections = wrapper.findAll('.v-select__selections')
    const initialItem = wrapper.props().initialItem
    const optionKeys = Object.keys(initialItem)
    let nextIndex = 0
    for (let i = 0; i < optionKeys.length; i++) {
      if (initialItem[optionKeys[i]] === '') break
      nextIndex++
    }
    const disabled = selections.at(nextIndex + 1).find('input').attributes().disabled
    expect(disabled).toBe('disabled')
  })

  it('get the next item from api each time one item is selected', async () => {
    const inputElms = wrapper.findAll('.v-input__slot')
    wrapper.vm.$nextTick(() => {
      expect(axios.$get).toHaveBeenCalledTimes(2)
    })

    inputElms.at(0).trigger('click')
    await wrapper.vm.$nextTick()
    const itemElms = wrapper.findAll('.v-list-item')
    itemElms.at(2).trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.vm.$nextTick(() => {
      expect(axios.$get).toHaveBeenCalledTimes(3)
    })
  })
})