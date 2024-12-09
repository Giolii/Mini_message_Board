#! /usr/bin/env node

const { compile } = require("ejs");
const { Client } = require("pg");

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);`;

const SEED_DATA_SQL = `
INSERT INTO messages (name,text) 
VALUES
  ('Bryan','Hi! I am Bryan'),
  ('Odin','Hi!, I am Odin'),
  ('Damon', 'Hi! I am Damon');
`;

async function main() {
  const client = new Client({
    connectionString: "postgresql://gi:Postpsw@localhost:5432/mini_msn",
  });
  try {
    console.log("Starting database seed...");
    await client.connect();
    console.log("Connected to database");

    console.log("Creating tables...");
    await client.query(CREATE_TABLE_SQL);

    console.log("Inserting seed data...");
    await client.query(SEED_DATA_SQL);

    console.log("Seeding completed sucessfully");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error;
  } finally {
    await client.end();
  }
}

main().catch((error) => {
  console.error("Failed to seed database: ", error);
  process.exit(1);
});
