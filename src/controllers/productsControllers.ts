import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category, Product,ProductWithRating } from "../types/types";

const knexInstance = knex(config);

const insert = async (req: Request, res: Response) => {
  try {
    const { title, price, description, category, image, rating } = req.body;

    const findCategory: Category[] = await knexInstance("categories")
      .select("id")
      .where({ name: category });

    if (!findCategory[0]) throw new Error("This category was not found");
      
    const categoryId: number | undefined = findCategory[0].id;

    const id: number[] = await knexInstance("products").insert({
      title,
      price,
      description,
      category_id: categoryId,
      image,
      rate: rating.rate,
      count: rating.count
    });

    res.status(201).json({ id: id[0], title, price,description,categoryId,image,rating });
  } catch (error:any) {
    res.send(error.message ?{error: error.message}: error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const products : Product[] = await knexInstance("products")
      .select("*", "categories.name as category","products.id as id")
      .join("categories", "categories.id", "=", "products.category_id");

      
    const formattedProducts: ProductWithRating[]= products.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating:{rate:product.rate, count: product.count },
    }));
    res.status(200).json(formattedProducts);
  } catch (error:any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id : string = req.params.id;
    const product : Product[] = await knexInstance("products")
    .select("*", "categories.name as category")
    .join("categories", "categories.id", "=", "products.category_id")
    .where({"products.id": id });

    const formattedProduct: ProductWithRating[] = product.map((product) => ({
      id: parseInt(id),
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {rate: product.rate, count:product.count}
    }));

    if (!product.length) throw new Error("This product was not found");

    res.status(200).json(formattedProduct[0]);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id:string = req.params.id;
    const {title , price, description, category, image, rating }: ProductWithRating = req.body;
    const updateData: any = { title , price, description, image, rate:rating.rate, count:rating.count };
    if (category) {
      const categoryData :any= await knexInstance("categories")
        .select("id")
        .where({ name: category });

      if (!categoryData[0]) {
        throw new Error("This category was not found");
      }
      updateData.category_id = categoryData[0].id;
    }

    await knexInstance("products").update(updateData).where({ id });

    res.status(200).json({ title , price, description, category, image, rating });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id:string = req.params.id;
    const product = await knexInstance("products").delete().where({ id });

    if (!product) throw new Error("This product was not found");

    res.status(200).json({ mensagem: "Product deleted" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};


export default { insert,index,show,update,remove};