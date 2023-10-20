import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import VehicleCard from '../VehicleCard.vue';

describe('VehicleCard', () => {
  it('Mounts properly', async () => {
    const vehicle = {
      id: 0,
      reg: 'AA12 BBB',
      category: 'small',
      fuel: 'diesel',
      make: 'Citroen',
      model: 'Escort'
    };
    const types = [{
      id: 0,
      name: 'Small car',
      type: 'small',
      cost: 25
      }];
    const wrapper = mount(VehicleCard, {
      props: {
        vehicle,
        types
      }
    })
    expect(wrapper).toBeTruthy()
  })
})