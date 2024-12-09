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

module.exports = {
  getAllMessages,
  insertMessage,
  deleteAll,
};
