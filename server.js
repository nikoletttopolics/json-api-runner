const express = require("express");
// új express példányt hoz létre
// az express fgv meghívásával létrejön egy szerver alkalmazás objektum, amit az app változóban tárolunk
const app = express();
const path = require("path");
const PORT = 3000;
const dispatch = require("./backend/dispatcher");

// middleware: olyan fgv, amely a request és response között fut le és módosíthatja,
// feldolgozhatja vagy továbbíthatja azokat.
// next()-tel továbbadja a vezérlést a következő middlewarehez vagy kódrészlethez

// parses incoming json request body
// feldolgozza a beérkező kérések json tartalmát (fe-ről jsonben küldjük az adtot) és elérhetővé teszi a req.bodyban
app.use(express.json());
// express statickal megmondjuk a kódnak, hogy a frontend mappa tartalmát olvassa fel
// és az abban lévő index.html-t a route routon tegye elérhetővé ('/')
// ha van több html fájl, akkor az alsó kikommentált kódrészletet kell használni
app.use(express.static(path.join(__dirname, "frontend")));

// várunk egy post hívást a dispatch routra
app.post("/dispatch", async (req, res) => {
  try {
    const results = await dispatch(req.body);
    // a javascript objectet json stringgé konvertálja
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
