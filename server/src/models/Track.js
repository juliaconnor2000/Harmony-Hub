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

    // static get relationMappings() {
    //     const { Review } = require("./index.js")
    //     return {
    //         reviews: {
    //             relation: Model.HasManyRelation,
    //             modelClass: Review,
    //             join: {
    //                 from: "stations.id",
    //                 to: "reviews.stationId"
    //             }
    //         }
    //     }
    // }
}

module.exports = Track
