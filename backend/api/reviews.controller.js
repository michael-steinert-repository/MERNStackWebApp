import ReviewDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {
    static async postReview(request, response, next) {
        try {
            const restaurantId = request.body.restaurant_id
            const text = request.body.text
            const userInfo = {
                name: request.body.name,
                _id: request.body.user_id
            }
            const date = new Date()

            const reviewResponse = await ReviewDAO.addReview(restaurantId, userInfo, text, date)
            response.json({status: "success"})
        } catch(error) {
            response.status(500).json({error: error.message})
        }
    }

    static async updateReview(request, response, next) {
        try {
            const reviewId = request.body.review_id
            const userId = request.body.user_id
            const text = request.body.text
            const date = new Date()

            const reviewResponse = await ReviewDAO.updateReview(reviewId, userId, text, date)
            response.json({status: "success"})
        } catch(error) {
            response.status(500).json({error: error.message})
        }
    }

    static async deleteReview(request, response, next) {
        try {
            const reviewId = request.query.id
            const userId = request.body.user_id

            const reviewResponse = await ReviewDAO.deleteReview(reviewId, userId)
            response.json({status: "success"})
        } catch(error) {
            response.status(500).json({error: error.message})
        }
    }
}