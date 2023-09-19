import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

//route for list all of items
app.get("/items", async (request, response) => {
  const items = await prisma.item.findMany();
  response.json(items);
});

//route for create a new item
app.post("/items", async (request, response) => {
  const { name, price } = request.body;
  const newItem = await prisma.item.create({
    data: {
      name,
      price,
    },
  });
  response.json(newItem);
});

//route for obtain a item by id
app.get("/items/:id", async (request, response) => {
  const { id } = request.params;
  const item = await prisma.item.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!item) {
    return response.status(400).json({ message: "Item not found" });
  }
});

//route for update a item by id
app.put("items/:id", async (request, response) => {
  const { id } = request.params;
  const { name, price } = request.body;
  const item = await prisma.item.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      price,
    },
  });
  response.json(item);
});

//route for delete a item by id
app.delete("/items/:id", async (request, response) => {
  const { id } = request.params;
  await prisma.item.delete({
    where: {
      id: Number(id),
    },
  });
  response.json({ message: "Item deleted" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
