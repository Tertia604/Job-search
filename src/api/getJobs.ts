import axios from "axios";

import { Job } from "./types";

const getJobs = async () => {
  const response = await axios.get<Job[]>("http://localhost:3000/jobs");
  return response.data;
};

export default getJobs;
