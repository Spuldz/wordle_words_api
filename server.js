const express = require("express");
const app = express();
const { readFileSync, promises: fsPromises } = require("fs");
const port = process.env.PORT || 5000;

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  return arr;
}

let compatableWords = [];
let data = syncReadFile("./words.txt");

for (let i = 0; i < data.length; i++) {
  if (data[i].length === 5) {
    if (!data[i].includes("-")) {
      compatableWords.push(data[i]);
    }
  }
}

app.get("/api", (req, res) => {
  res.json({ words: compatableWords });
});

app.listen(port, () => {
  console.log("listening on port 5000");
});
