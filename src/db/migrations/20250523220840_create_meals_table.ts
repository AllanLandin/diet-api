import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("meals", (table)=>{
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('description')
        table.date('date').notNullable() 
        table.boolean('is_in_diet').notNullable()

        
        table.integer('user_id').unsigned().notNullable()
        table.foreign('user_id').references('id').inTable('users')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("meals")
}

