/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("recommendations", (table) => {
        table.bigIncrements("id")
        table.bigInteger("recommenderId").unsigned().notNullable().index().references("users.id")
        table.bigInteger("recommendeeId").unsigned().notNullable().index().references("users.id")
        table.bigInteger("trackId").unsigned().notNullable().index().references("tracks.id")
        table.string("recommendedTrack")
        table.string("recommendedArtist")
        table.string("textBody")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
    return knex.schema.dropTableIfExists("recommendations")
}
