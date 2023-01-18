import { shallowMount } from "@vue/test-utils";

import Subnav from "@/components/Navigation/Subnav";

jest.mock("vue-router");

describe("Subnav", () => {
  describe("when user is on job page", () => {
    it("displays job count", () => {
      require("vue-router").useRoute.mockReturnValueOnce({
        name: "jobResults",
      });
      const wrapper = shallowMount(Subnav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(true);
    });
  });

  describe("when user is not on job page", () => {
    it("dost NOT display job count", () => {
      require("vue-router").useRoute.mockReturnValueOnce({ name: "home" });
      const wrapper = shallowMount(Subnav, {
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });
      const jobCount = wrapper.find("[data-test='job-count']");
      expect(jobCount.exists()).toBe(false);
    });
  });
});
