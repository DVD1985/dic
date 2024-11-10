import { parse as htmlParser } from "node-html-parser";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/autocomplete", async (req, res) => {
  const { palabra } = req.body;
  try {
    const response = await fetch(`https://dle.rae.es/srv/keys?q=${palabra}`);
    const respuesta = await response.text();
    res.json(respuesta);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Server Error");
  }
});

app.post("/palabra", async (req, res) => {
  const { palabra } = req.body;
  try {
    const request = await fetch("https://dle.rae.es/" + palabra);
    const response = await request.text();
    const doc = htmlParser(response);
    const definiciones = [...doc.querySelectorAll(".j")].map((d) => {
      return d.innerText;
    });
    res.json(definiciones);
  } catch (error) {
    console.error("Error obteniendo definiciones:", error);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
