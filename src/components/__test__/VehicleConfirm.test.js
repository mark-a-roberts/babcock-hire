import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import VehicleConfirm from "@/components/VehicleConfirm.vue";
import { createVuetify } from 'vuetify'


// TODO: resolve ugly fix of test bug

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

describe('VehicleConfirm', () => {
  it('Mounts properly', async () => {
    const wrapper = mount(VehicleConfirm, {
      props: {},
      global: {
        components: {
          VehicleConfirm,
        },
        plugins: [vuetify],
      }
    })
    expect(wrapper).toBeTruthy()
  })
})