import { Router } from "express";
import BookSchema from "../models/Book.schema.js";
import auth from "../middleware/auth.js"

const route = Router();
route.use(auth)

route.get("/", async (req, res) => {
  try {
    const books = await BookSchema.find({})

      .then((books) => {
        res.send(books);
      })
      .catch((err) => res.send(err));
  } catch (error) {
    console.log(error);
  }
});

route.post("/post", async (req, res) => {
  const book = await BookSchema.create(req.body)
    .then((book) => res.send(book))
    .catch((err) => res.send(err));
});

route.get("/:id", async (req, res) => {
  const id = req.params.id;
  const book = await BookSchema.findById(id)
    .then((book) => res.send(book))
    .catch((err) => res.send(err));
});

route.put("/:id", async (req, res) => {
  const id = req.params.id;
  const book = await BookSchema.findByIdAndUpdate(
    id,
    req.body
  )
    .then(() => res.send("Book Updated"))
    .catch((err) => res.send(err));
});

route.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const book = await BookSchema.findByIdAndDelete(
    id
  )
    .then(() => res.send("Book Deleted"))
    .catch((err) => res.send(err));
});
export default route;
