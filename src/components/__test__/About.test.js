import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import About from "@/components/About.vue";
describe('About', () => {
  it('Mounts properly', async () => {
    const wrapper = mount(About)
    expect(wrapper).toBeTruthy()
  })
})