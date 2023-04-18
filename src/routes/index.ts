import { router as productsRoutes } from "./productsRoutes";

import { Router } from "express";

const router: Router = Router();

router.use("/products", productsRoutes)

export { router };