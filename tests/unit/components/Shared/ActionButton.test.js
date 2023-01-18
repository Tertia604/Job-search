import { mount } from "@vue/test-utils";

import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders text", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "Sign in",
      },
    });
    expect(wrapper.text()).toMatch("Sign in");
  });

  it("apllies one of several styles to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "Sign in",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});
