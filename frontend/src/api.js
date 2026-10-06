import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
});

export const getSiteSettings = () => api.get("site-settings/").then((r) => r.data);
export const getAbout = () => api.get("about/").then((r) => r.data);
export const getServices = () => api.get("services/").then((r) => r.data);
export const getService = (slug) => api.get(`services/${slug}/`).then((r) => r.data);
export const getStats = () => api.get("stats/").then((r) => r.data);
export const getProjects = () => api.get("projects/").then((r) => r.data);
export const submitContact = (payload) => api.post("contact/", payload).then((r) => r.data);

export default api;
