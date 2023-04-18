import { Router } from "express";
import categoriesControllers from "../controllers/categoriesController";

const router: Router = Router();

router.post("/", categoriesControllers.insert);
router.get("/", categoriesControllers.index);
router.get("/:id", categoriesControllers.show);
router.put("/:id", categoriesControllers.update);
router.delete("/:id", categoriesControllers.remove);

export { router };