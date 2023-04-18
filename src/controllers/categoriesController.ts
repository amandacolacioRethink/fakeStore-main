import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category } from "../types/types";

const knexInstance = knex(config);

const index = async (req: Request, res: Response) => {
  try {
    const categories: Category[] = await knexInstance("categories").select("*");
    const formatedCategories = categories.map((category) => category.name);
    res.status(200).json(formatedCategories);
  } catch (error:any) {
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const products = await knexInstance("products")
    .select(
      "*",
      "categories.name as category",
      "categories.id as category_id",
      "products.id as id"
    )
    .join("categories", "categories.id", "=", "products.category_id")
    .where({ category });

    const formatedProducts = products.map((product) => ({
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rate,
        count: product.count,
      },
    }));

    res.status(200).json(formatedProducts);
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const insert = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const id: number[] = await knexInstance("categories").insert({
      name,
    });

    res.status(201).json({ id: id[0], name});
  } catch (error: any) {
    res.send(error);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const id:string = req.params.id;
    const { name } = req.body;
    const updatedData: Category = { name };

    await knexInstance("categories")
      .update(updatedData)
      .where({ id });

    res.status(200).json({id,name});
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const id:string = req.params.id;
    const category = await knexInstance("categories").delete().where({ id });
    if (!category) throw new Error("This category was not found");

    res.status(200).json({ mensagem: "Category deleted" });
  } catch (error: any) {
    res.send(error.message ? { error: error.message } : error);
  }
};

export default { insert, index, show, update, remove };



