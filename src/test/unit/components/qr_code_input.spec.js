import QRCodeInput from "@/components/QRCodeInput.vue";
import { shallowMount } from "@vue/test-utils";
import { describe, expect, it, test, vi } from "vitest";
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

    it('renders generate qr code button with text', () => {
      const component = wrapper.find('#btn-generate');
      expect(component.text()).toContain('Generar QR');
    });

    it('render txt input, change its value and see if stored', () => {
      // TODO: wrapper nos ayuda a interactual con el componente tanto html y sus propiedades
      const component = wrapper.find('#txt-qr-code');
      expect(component.element.value).toContain('');

      component.setValue('https://danniel.dev');

      expect(component.element.value).toContain('https://danniel.dev')
    });
  });

  // para porbar metodos asincronos se deja el async en el it ejem: it('', async () => { })

  // para realizar una accion se usa el trigger igual del find del wrapper ejem: component.trigger('click')

  // para validar constantes se usa el component.vm.variable ejem: component.vm.qrCode


  it('spyon', async () => {
    // Ya no se usa jest sino vitest
    const spy = vi.spyOn(QRCodeInput.methods, 'sendQRCode');
    const wrapper = shallowMount(QRCodeInput);

    const component = wrapper.find('#btn-generate');
    component.trigger('click');

    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('spyon', async () => {

    // const sendQRCodeMock = vi.fn()

    // const wrapper = shallowMount(QRCodeInput, {
    //   methods: {
    //     sendQRCode: sendQRCodeMock
    //   }
    // });

    // const component = wrapper.find('#btn-generate');
    // component.trigger('click');

    // expect(sendQRCodeMock).toHaveBeenCalled();
    // expect(sendQRCodeMock).toHaveBeenCalledTimes(1);
  });

  describe('actions and mocks', () => {
    describe('trigger lick in qr code buton and the event it is caled', () => {
      const spySendQRCode = vi.spyOn(QRCodeInput.methods, 'sendQRCode')
      const wrapper = shallowMount(QRCodeInput)

      const txtComponent = wrapper.find('#txt-qr-code')

      txtComponent.setValue('https://danniel.dev')

      it('the send qr code function it is begin called', async () => {
        const btnComponent = wrapper.find('#btn-generate')
        btnComponent.trigger('click')
        expect(spySendQRCode).toHaveBeenCalled()
        expect(spySendQRCode).toHaveBeenCalledTimes(2)
        expect(wrapper.emitted()).toHaveProperty('qrCodeInput')

        // Se comprueba que el método se llamó con el parámetro qrCodeInput.
        // wrapper.emitted() devuelve un objeto con los eventos que se dispararon en el componente.
        // toHaveProperty('qrCodeInput') comprueba que el objeto tiene la propiedad qrCodeInput.

        expect(wrapper.emitted('qrCodeInput')).toHaveLength(1)
        // Se comprueba que el evento qrCodeInput se llamó una vez.
        // wrapper.emitted('qrCodeInput') devuelve un array con los parámetros que se le pasaron al evento qrCodeInput.
        // toHaveLength(n) comprueba que el array tiene n elementos.

        expect(wrapper.emitted('qrCodeInput')[0]).toStrictEqual(['https://danniel.dev']) // Se comprueba que el evento qrCodeInput se llamó con el parámetro qrCode.
        // wrapper.emitted('qrCodeInput')[0] devuelve el primer elemento del array.
        // toStrictEqual([qrCode]) comprueba que el array tiene el elemento qrCode.
      })

    });
  })

});
