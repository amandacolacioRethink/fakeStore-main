import { Router } from "express";
import categoriesControllers from "../controllers/categoriesController";

const categories: Router = Router();
const category: Router = Router();

categories.post("/", categoriesControllers.insert);
categories.get("/", categoriesControllers.index);
category.get("/:category", categoriesControllers.show);
categories.put("/:id", categoriesControllers.update);
categories.delete("/:id", categoriesControllers.remove);

export { categories, category };