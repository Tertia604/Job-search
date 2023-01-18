import axios from "axios";

import { Degree } from "./types";

const getDegree = async () => {
  const response = await axios.get<Degree[]>("http://localhost:3000/degrees");
  return response.data;
};

export default getDegree;
