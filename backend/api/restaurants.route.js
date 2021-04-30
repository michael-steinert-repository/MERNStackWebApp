import express from 'express'
import RestaurantsController from "./restaurants.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsController.getRestaurants)

export default router