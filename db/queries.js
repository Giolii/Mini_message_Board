const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(message) {
  console.log("New message: ", message);
  await pool.query("INSERT INTO messages (name,text) VALUES ($1,$2)", [
    message.name,
    message.text,
  ]);
}

async function deleteAll() {
  try {
    await pool.query("DELETE FROM messages");
    console.log("All messages have been cleared");
  } catch (error) {
    console.error("Error clearing messages:", error);
    throw error;
  }
}

async function populatedb() {
  try {
    await pool.query(CREATE_TABLE_SQL);
    await pool.query(SEED_DATA_SQL);
  } catch (error) {
    console.error("Error populating db", error);
    throw error;
  }
}

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

module.exports = {
  getAllMessages,
  insertMessage,
  deleteAll,
  populatedb,
};
