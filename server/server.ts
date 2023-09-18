import bodyParser from "body-parser";
import express, { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(bodyParser.json());

let items: any[] = [];

app.get("/items", (req: Request, res: Response) => {
  res.json(items);
});

app.get("/items:id", (req: Request, res: Response) => {
    res.json(items);
  });

app.post("/items", (req: Request, res: Response) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put("/items/:id", (req: Request, res: Response) => {
  const itemId = req.params.id;
  const updatedItem = req.body;

  const index = items.findIndex((item) => item.id === itemId);

  if (index === -1) {
    res.status(404).json({ error: "Item not found" });
  } else {
    items[index] = updatedItem;
    res.json(updatedItem);
  } 
});

app.delete("/items/:id", (req: Request, res: Response) => {
  const itemId = req.params.id;

  const index = items.findIndex((item) => item.id === Number(itemId));
  if (index === -1) {
    res.status(404).json({ error: "Item not found" });
    } else {
    items = items.filter((item) => item.id !== +itemId);
    res.status(204).end();
    }
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
