import mongodb from 'mongodb'

const objectId = mongodb.ObjectId

let reviews

export default class ReviewsDAO {
    static async injectDB(connection) {
        if (reviews) {
            return
        }
        try {
            reviews = await connection.db(process.env.NS).collection("reviews")
        } catch (error) {
            console.error(`Unable to establish a Collection handle in reviewsDAO.js: ${error}`)
        }
    }

    static async addReview(restaurantId, user, text, date) {
        try {
            const reviewDocument = {
                name: user.name,
                user_id: user._id,
                date: date,
                text: text,
                /* restaurantId is converted into a MongoDB-ID */
                restaurant_id: objectId(restaurantId),
            }

            return await reviews.insertOne(reviewDocument)
        } catch (error) {
            console.error(`Unable to post Review: ${error}`)
            return {error: error}
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                {user_id: userId, _id: objectId(reviewId)},
                {$set: {text: text, date: date}},
            )

            return updateResponse
        } catch (error) {
            console.error(`Unable to update Review: ${error}`)
            return {error: error}
        }
    }

    static async deleteReview(reviewId, userId) {

        try {
            const deleteResponse = await reviews.deleteOne({
                _id: objectId(reviewId),
                user_id: userId,
            })

            return deleteResponse
        } catch (error) {
            console.error(`Unable to delete Review: ${error}`)
            return {error: error}
        }
    }
}