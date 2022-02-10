import { mount } from  '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Dialog from '../../components/Dialog.vue'

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

describe('Dialog component', () => {
  const app = document.createElement('div')
  app.setAttribute('data-app', true)
  document.body.appendChild(app)

  let wrapper
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify
    wrapper = mount(Dialog, {
      vuetify
    })
    jest.spyOn(wrapper.vm, 'agree')
    jest.spyOn(wrapper.vm, 'cancel')
  })

  it('should return Promise when open itself (pending)', async () => {
    const ret = wrapper.vm.open()
    await wrapper.vm.$nextTick()
    expect(ret instanceof Promise).toBe(true)
  })

  it('should resolve/reject Promise when close itself (notification)', async () => {
    const ret = wrapper.vm.open()
    await wrapper.vm.$nextTick()
    const buttonElms = wrapper.findAll('.v-btn')
    buttonElms.at(0).trigger('click')
    expect(wrapper.vm.cancel).toHaveBeenCalled()
    buttonElms.at(1).trigger('click')
    expect(wrapper.vm.agree).toHaveBeenCalled()
  })

  it('should resolve/reject Promise when close itself (notification)', async () => {
    const ret = wrapper.vm.open()
    await wrapper.vm.$nextTick()
    const buttonElms = wrapper.findAll('.v-btn')
    buttonElms.at(0).trigger('click')
    expect(wrapper.vm.cancel).toHaveBeenCalled()
    buttonElms.at(1).trigger('click')
    expect(wrapper.vm.agree).toHaveBeenCalled()
  })
})