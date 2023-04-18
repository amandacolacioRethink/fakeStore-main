import { Router } from "express";
import productsControllers from "../controllers/productsControllers";

const router: Router = Router();

router.post("/", productsControllers.insert);
router.get("/", productsControllers.index);
router.get("/:id", productsControllers.show);
router.put("/:id", productsControllers.update);
router.delete("/:id", productsControllers.remove);

export { router };