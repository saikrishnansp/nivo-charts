import axios from "axios";
export const api = axios.create({ baseURL: "http://localhost:8000", timeout: 10000 });
export async function fetchChart(name: string) {
  const res = await api.get(`/charts/${name}`);
  return res.data;
}
