import { Client } from "pg";

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "root",
  password: "root",
  database: "coinsmaster",
});

client.connect();

export default async (query: string, values?: any) => {
  const { rows } = await client.query(query, values);
  return rows;
};
