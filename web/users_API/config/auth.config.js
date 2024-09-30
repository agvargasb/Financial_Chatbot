module.exports = {
  secret: process.env.AUTH_SECRET ?? "sarasadev",
  refresh: process.env.REFRESH_SECRET ?? "devrefresh",
  expires: process.env.AUTH_EXPIRES ?? "20",
  rounds: process.env.AUTH_ROUNDS ?? "3",
  activate: process.env.AUTH_ACTIVATE ?? "12345",
};
