/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.table("tracks", (table) => {
        table.string("trackAudio").nullable()
    })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.table("tracks", (table) => {
        table.dropColumn("trackAudio")
    })
}
