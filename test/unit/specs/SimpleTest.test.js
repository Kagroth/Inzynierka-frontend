import LoginForm from '@/components/LoginForm'
import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import jsdom from 'jsdom-global'
import Vue from 'vue'

describe('LoginForm', () => {
  test('jakis tam test', () => {
    Vue.use(Vuetify)
    const wrapper = mount(LoginForm)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
