const Model = require("./Model")

class Track extends Model {
    static get tableName() {
        return "tracks"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "artist", "albumArt", "userId"],
            properties: {
                name: { type: "string" },
                artist: { type: "string" },
                albumArt: { type: "string" },
                userId: { type: ["integer", "string"] }
            }
        }
    }

    static get relationMappings() {
        const { Recommendation } = require("./index.js")
        return {
            recommendations: {
                relation: Model.HasManyRelation,
                modelClass: Recommendation,
                join: {
                    from: "tracks.id",
                    to: "recommendations.trackId"
                }
            }
        }
    }
}

module.exports = Track
