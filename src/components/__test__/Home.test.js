import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Home from "@/components/Home.vue";
describe('Home', () => {
  it('Mounts properly', async () => {
    const wrapper = mount(Home)
    expect(wrapper).toBeTruthy()
  })
})