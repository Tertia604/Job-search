import { Job, Degree, SpotLights } from "@/api/types";

export interface GlobalState {
  isLoggedIn: boolean;
  jobs: Job[];
  degrees: Degree[];
  skillsSearchTerm: string;
  locationsSearchTerm: string;
  selectedOrganizations: string[];
  selectedJobTypes: string[];
  selectedDegrees: string[];

  spotLights: SpotLights[];
}
