import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

//  list all Products
app.get("/products", async(req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
})

app.post("/product", async(req, res) => {
  const { name, price } = req.body;
  const products = await prisma.product.create({
    data: {
      name,
      price: parseFloat(price),
    }
  })
  res.json(products)
})

app.delete("/product/:id", async(req, res) => {
  const {id} = req.params;
  const products = await prisma.product.delete({
    where: {
      id: parseInt(id)
    }
  })
  if(!products) {
    return res.status(404).json({message: "Product not found"})
  } else {
    return res.json({ message: "Product deleted" })
  }
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
