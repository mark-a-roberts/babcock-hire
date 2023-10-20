import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import VehicleList from '../VehicleList.vue';
import { createVuetify } from 'vuetify'


// TODO: resolve ugly fix of test bug

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

describe('VehicleList', () => {
  it('Mounts properly', async () => {
    const wrapper = mount(VehicleList, {
      props: {},
      global: {
        components: {
          VehicleList,
        },
        plugins: [vuetify],
      }
    })
    expect(wrapper).toBeTruthy()
  })
})