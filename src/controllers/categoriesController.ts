import { Request, Response } from "express";
import knex from "knex";
import config from "../../knexfile";
import { Category } from "../types/types";

const knexInstance = knex(config);

const index = async (req: Request, res: Response) => {
  try {
    const categories: Category[] = await knexInstance("categories").select("*");
    res.status(200).json(categories);
  } catch (error:any) {
    res.send(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id:string = req.params.id;
    const category: Category[]  = await knexInstance("categories").select("*").where({ id });
    if (!category.length) throw new Error("This category was not found");

    res.status(200).json(category[0]);
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








  //inserir dados por código

//  const url = "https://fakestoreapi.com/";

//   const geralFetch = async (url:any) => {
//     return await fetch(url).then((request) => request.json());
//   };

//   const insert = async () => {
//     try {
        
//       const categories = await geralFetch(url + "products/" + 'categories');    
      
//       await Promise.all(
//         categories.map(async (category:any)=> {
//           const id: number[] = await knexInstance("categories").insert({
//             name: category,
//           });
//         })
//       );
          
//     } catch (error: any) {
      
//     }
//   };
