const express = require("express");
const cors = require("cors");

const predictRoute = require("./routes/predict");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/predict", predictRoute);

app.listen(5001, () => {
  console.log("Server running on port 5001");
});