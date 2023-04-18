import knex from "knex";
import knexFile from "./knexfile";

const knexInstance = knex(knexFile);

const url = "https://fakestoreapi.com/products";

const insertAllCategories = async () => {
  const categories = await fetch(url+
    "/categories"
  ).then((res) => res.json());

  await knexInstance
    .insert(
      categories.map((item: string) => ({
        name: item,
      }))
    )
    .into("categories");
};

const insertAllProducts = async () => {
  try {
    const products = await fetch(url).then(
      (res) => res.json()
    );

    const productsData = products.map(async (product: any) => ({
      title: product.title,
      price: product.price,
      description: product.description,
      category_id: await findCategoryId(product.category),
      image: product.image,
      rate: product.rating.rate,
      count: product.rating.count,
    }));

    const promiseResolved = await Promise.all(productsData);

    await knexInstance.insert(promiseResolved).into("products");
    console.log("pronto")

  } catch (error) {
    console.error(error);
  }
};

const findCategoryId = async (categoryName: string) => {
  const dado = await knexInstance("categories")
    .select("id")
    .where({ name: categoryName });

  return dado[0].id;
};
//insertAllProducts();
// insertAllCategories();