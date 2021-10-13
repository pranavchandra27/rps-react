export const backend_url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "https://rock-paper-scissors-backend-g.herokuapp.com";
