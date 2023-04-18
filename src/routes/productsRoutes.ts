import { Router } from "express";
import productsControllers from "../controllers/productsControllers";
import {categories, category} from "./categoriesRoutes"

const router: Router = Router();

router.use('/categories', categories);
router.use('/category', category)

router.post("/", productsControllers.insert);
router.get("/", productsControllers.index);
router.get("/:id", productsControllers.show);
router.put("/:id", productsControllers.update);
router.delete("/:id", productsControllers.remove);

export { router };