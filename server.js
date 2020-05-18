const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./routes/apiroutes")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use("/api", apiRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/googlebooks";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
