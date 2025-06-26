const express = require("express");
const app = express();
const path = require("path");
const PORT = 3000;
const dispatch = require("./backend/dispatcher");

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

app.post("/dispatch", async (req, res) => {
  try {
    const results = await dispatch(req.body);
    res.json(results);
  } catch (error) {
    res.status(400).json({ error: "error" });
  }
});

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "index.html"));
// });

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
