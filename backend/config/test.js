const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://findstaysadmin:YOUR_PASSWORD@cluster0.lclm6gs.mongodb.net/?retryWrites=true&w=majority";

async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("CONNECTED SUCCESSFULLY");
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

run();