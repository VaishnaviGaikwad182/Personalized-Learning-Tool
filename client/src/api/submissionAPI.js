import API from "../utils/api";

// Student
export const getAvailableFAs = () => API.get("/submissions/available-fas");
export const submitFASubmission = (formData) =>
  API.post("/submissions/submit", formData, { headers: { "Content-Type": "multipart/form-data" } });

// Teacher
export const getSubmissions = (filters) => API.post("/submissions/all", filters);
