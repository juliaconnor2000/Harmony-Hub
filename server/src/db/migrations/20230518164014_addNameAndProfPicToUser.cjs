/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("users", (table) => {
        table.string("displayName")
        table.text("profilePicture")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.table("users", (table) => {
        table.dropColumn("displayName")
        table.dropColumn("profilePicture")
    })
}
