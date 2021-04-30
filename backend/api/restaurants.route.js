import express from 'express'
import RestaurantsController from './restaurants.controller.js'
import ReviewsController from './reviews.controller.js'

const router = express.Router()

router.route("/").get(RestaurantsController.getRestaurants)
router.route("/id/:id").get(RestaurantsController.getRestaurantById)
router.route("/cuisines").get(RestaurantsController.getRestaurantCuisines)

router.route("/review")
    .post(ReviewsController.postReview)
    .put(ReviewsController.updateReview)
    .delete(ReviewsController.deleteReview)

export default router