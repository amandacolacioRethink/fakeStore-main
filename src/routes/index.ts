import { router as productsRoutes } from "./productsRoutes";
import { router as categoriesRoutes } from "./categoriesRoutes";

import { Router } from "express";

const router: Router = Router();

router.use("/products", productsRoutes)
router.use("/categories", categoriesRoutes)

export { router };