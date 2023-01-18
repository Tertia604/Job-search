import { mount } from "@vue/test-utils";

import JobSearchForm from "@/components/JobSearch/JobSearchForm";

jest.mock("vue-router");

describe("JobSearchForm", () => {
  describe("when user submit form", () => {
    it("directs user to job results page with user's search parameters", async () => {
      const push = jest.fn();

      require("vue-router").useRoute.mockReturnValueOnce({
        push,
      });
      const wrapper = mount(JobSearchForm, {
        attachTo: document.body,
        global: {
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = wrapper.find("[data-test='role-input']");
      await roleInput.setValue("Vue Developer");

      const locationInput = wrapper.find("[data-test='location-input']");
      await locationInput.setValue("Dalos");

      const submitButton = wrapper.find("[data-test='form-submit-button']");
      await submitButton.trigger("click");

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: {
          role: "Vue Developer",
          location: "Dalos",
        },
      });
    });
  });
});
