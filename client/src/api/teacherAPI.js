import API from "../utils/api";

// =====================
// Teacher Queries
// =====================
export const getClassStats = (filters) =>
  API.get("/teacher/class-stats", { params: filters });

export const getClassQueries = (filters) =>
  API.get("/teacher/class-queries", { params: filters });

export const getTeacherQueries = () =>
  API.get("/teacher/queries/all");

export const resolveQuery = (queryId, reply) =>
  API.put(`/teacher/queries/${queryId}/resolve`, { reply });

// =====================
// FA Mode
// =====================
export const createFAMode = (data) => API.post("/fa/create", data);
export const getFAModes = () => API.get("/fa");


// =====================
// Marks
// =====================
export const uploadMarks = (data) => API.post("/marks/upload", data);

// =====================
// Teachers List
// =====================
export const getAllTeachers = () => API.get("/teacher/all");
