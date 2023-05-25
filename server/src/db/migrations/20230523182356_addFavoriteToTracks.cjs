/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("tracks", (table) => {
        table.boolean("favorite").defaultTo(false)
    })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.table("tracks", (table) => {
        table.dropColumn("favorite")
    })
}
