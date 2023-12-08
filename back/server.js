import express from "express";
import { generateUploadURL } from "./s3.js";
import path from "path";
import.meta.url

const app = express();
console.log("HI");

const url = new URL(import.meta.url);
const dirname = path.dirname(url.pathname);
const grandparentDir = path.dirname(dirname);
// app.use(express.static("front"));
app.use(express.static(path.join(grandparentDir, "front")));

app.get("/s3Url", async (req, res) => {
  console.log("HI");
  const url = await generateUploadURL();
  res.send({ url });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(grandparentDir, 'front', 'index.html'));
});


app.listen(8080, () => console.log("listening on port 8080"));
