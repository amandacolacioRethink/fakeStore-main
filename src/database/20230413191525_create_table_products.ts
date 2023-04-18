import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("products", function (table) {
        table.increments();
        table.string("title").notNullable();
        table.integer("price").notNullable();
        table.string("description").notNullable();
        table.string("category_id").notNullable();
        table.string("image").notNullable();
        table.json("rating").notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("products");
}

