export const backend_url =
  // "https://rock-paper-scissors-backend-g.herokuapp.com";
process.env.NODE_ENV === "development"
  ? "http://localhost:5000"
  : "https://rock-paper-scissors-backend-g.herokuapp.com";
