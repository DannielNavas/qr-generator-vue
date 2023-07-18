import QRCodeInput from "@/components/QRCodeInput.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { createStore } from "vuex";

describe('QRCodeInput.vue', () => {

  describe('mounting a component', () => {
    it('renders qr code input component', () => {
      const wrapper = shallowMount(QRCodeInput);
      const component = wrapper.find('.hello');
      expect(component.classes()).toContain('hello');
    } )
  });

  describe('renders qr code input component with its dependencies', () => {
    const store = createStore({
      state() {
        return {
          qrCode: '1234567890'
        }
      }
    });

    // TODO de esta forma agrega las dependencias
    const wrapper = shallowMount(QRCodeInput, {
      global: {
        plugins: [store]
      }
    })

    it('', () => { });
  });

});
