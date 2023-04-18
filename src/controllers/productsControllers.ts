import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Product } from "../types/types";

const knexInstance = knex(config);

const insert = async (req: Request, res: Response) => {
  try {
    const { title, price, description, category, image, rating } = req.body;

    const findCategory:any[] = await knexInstance("categories")
      .select("id")
      .where({ name: category });

    if (!findCategory[0]) throw new Error("This category was not found");
      
    const categoryId:number = findCategory[0].id;

    const id: number[] = await knexInstance("products").insert({
      title,
      price,
      description,
      category_id: categoryId,
      image,
      rating: JSON.stringify(rating)
    });

    res.status(201).json({ id: id[0], title, price,description,categoryId,image,rating });
  } catch (error:any) {
    res.send(error.message ?{error: error.message}: error);
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await knexInstance("products")
      .select("products.title", "products.price", "products.description", "products.image", "products.rating", "categories.name as category")
      .join("categories", "categories.id", "=", "products.category_id");

      
    const formattedProducts: Product[]  = products.map((product) => ({
      ...product,
      rating: JSON.parse(product.rating)
    }));

    res.status(200).json(formattedProducts);
    res.status(200).json(products);
  } catch (error:any) {
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id : string = req.params.id;
    const product: Product[] = await knexInstance("products")
    .select("products.title", "products.price", "products.description", "products.image", "products.rating", "categories.name as category")
    .join("categories", "categories.id", "=", "products.category_id")
    .where({"products.id": id });

    const formattedProduct: Product[] = product.map((product) => ({
      ...product,
      rating: JSON.parse(product.rating)
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
    const {title , price, description, category, image, rating } = req.body;
    const updateData: any = { title , price, description, image, rating };
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





//buscar produtos da api com codigo
// const url = "https://fakestoreapi.com/";

// const geralFetch = async (url:any) => {
//   return await fetch(url).then((request) => request.json());
// };

// const insert = async () => {
//   try {
//     const products = await geralFetch(url + "products");    


//       products.map(async (products:any)=> {
//         const findCategory = await knexInstance("categories")
//         .select("id")
//         .where({ name: products.category });

//         const categoryId = findCategory[0].id;
//         console.log(categoryId)

//         const id: number[] = await knexInstance("products").insert({
          // title: products.title,
          // price: products.price,
          // description: products.description,
          // category_id: categoryId,
          // image: products.image,
          // rating: JSON.stringify(products.rating),
//         });
//       })

//   } catch (error) {

//   }
// };
// insert()
