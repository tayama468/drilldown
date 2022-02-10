import { mount } from  '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import DrillDownSearch from '../../pages/DrillDownSearch.vue'

Vue.use(Vuetify)

// cf. https://github.com/vuejs/vue-test-utils/issues/974#issuecomment-423721358
// [Vue warn]: Error in mounted hook: "ReferenceError: requestAnimationFrame is not defined"
global.requestAnimationFrame = (cb) => cb()

// This is temporary solution for remove warn below
// [Vue warn]: Error in callback for watcher "isActive": "ReferenceError: cancelAnimationFrame is not defined"
global.cancelAnimationFrame = function() {
  setTimeout(function() {}, 0)
}

// This is temporary solution for remove warn below
// [Vue warn]: Error in directive click-outside inserted hook: "ReferenceError: ShadowRoot is not defined"
global.ShadowRoot = (cb) => cb()

// cf. https://github.com/vuejs/vue/issues/9698#issuecomment-473258879
// Attempted to log "[Vue warn]: Error in callback for watcher "listIndex": "ReferenceError: performance is not defined"
// eslint-disable-next-line no-undef
global.performance = window.performance;

describe('DrillDownSearch page', () => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  let vuetify
  let wrapper

  beforeEach(() => {
    vuetify = new Vuetify
    wrapper = mount(DrillDownSearch, {
      vuetify,
      stubs: ['DrillDown']
    })
  })

  it('should use dialog when use drilldown', async () => {
    const buttonElms = wrapper.findAll('.v-btn')
    buttonElms.at(0).trigger('click')
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isDialogOpened).toBe(true)
  })

  it('can access DrillDown data when dialog have been closed', async () => {
    const buttonElms = wrapper.findAll('.v-btn')
    buttonElms.at(0).trigger('click')
    await wrapper.vm.$nextTick()
    wrapper.vm.$refs.confirm.agree()
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.isResoleved).toBe(true)
  })
})
