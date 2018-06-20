const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const runner = require("./puppeteer");
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.get("/", (req, res) => res.send("Hello World!"));
app.post("/scrape", async (req, res) => {
  const { search } = req.body;
  const data = await runner(search);
  return res.json({ data });
});

app.listen(3000 || process.env.PORT, () =>
  console.log("Example app listening on port 3000!")
);
