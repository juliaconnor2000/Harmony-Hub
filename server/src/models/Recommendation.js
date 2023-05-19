const Model = require("./Model")

class Recommendation extends Model {
    static get tableName() {
        return "recommendations"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["recommenderId", "recommendeeId", "songId"],
            properties: {
                recommenderId: { type: ["integer", "string"] },
                recommendeeId: { type: ["integer", "string"] },
                songId: { type: ["integer", "string"] },
                recommendedSong: { type: "string" },
                recommendedArtist: { type: "string" },
                textBody: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const { User } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "recommendations.recommenderId",
                    to: "users.id"
                }
            }
        }
    }

    static get relationMappings() {
        const { User } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "recommendations.recommendeeId",
                    to: "users.id"
                }
            }
        }
    }

    static get relationMappings() {
        const { Track } = require("./index.js")
        return {
            track: {
                relation: Model.BelongsToOneRelation,
                modelClass: Track,
                join: {
                    from: "recommendations.trackId",
                    to: "tracks.id"
                }
            }
        }
    }
}

module.exports = Recommendation