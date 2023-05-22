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
                userId: { anyOf: [{ type: "integer" }, { type: "string" }] },
                trackAudio: { type: "string" }
                // userId: { type: ["integer", "string"], allowUnionTypes: true },
                // trackAudio: { type: ["string", "text"], allowUnionTypes: true }
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
