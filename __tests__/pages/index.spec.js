import { mount } from  '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Index from '../../pages/index.vue'

Vue.use(Vuetify)

describe('sample', () => {
  let wrapper
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify
    wrapper = mount(Index, {
      vuetify
    })
  })

  it('test', () => {
    expect(1).toBe(1)
  })
})

