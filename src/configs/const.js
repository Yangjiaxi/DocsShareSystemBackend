const { DB_PORT, SERCET } = process.env;

export const secret = SERCET;
export const dbURI = `mongodb://localhost:${DB_PORT}/docs`;
