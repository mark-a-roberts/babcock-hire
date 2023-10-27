import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import VehicleReserve from "@/components/VehicleReserve.vue";
import { createVuetify } from 'vuetify'


// TODO: resolve ugly fix of test bug

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

describe('VehicleReserve', () => {
  it('Mounts properly', async () => {
    const wrapper = mount(VehicleReserve, {
      props: {},
      global: {
        components: {
          VehicleReserve
        },
        plugins: [vuetify],
      }
    })
    expect(wrapper).toBeTruthy()
  })
})