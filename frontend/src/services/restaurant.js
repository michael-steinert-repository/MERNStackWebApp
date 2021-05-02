import http from '../http-common.js'

class RestaurantDataService {
    /* Adding Parameters to basic URL from Axios */
    getAll(page = 0) {
        return http.get(`?page=${page}`)
    }

    get(id) {
        return http.get(`/restaurant?id=${id}`)
    }

    find(by = "name", query, page = 0) {
        return http.get(`?${by}=${query}&page=${page}`)
    }

    createReview(data) {
        return http.post("/review-new", data)
    }

    updateReview(data) {
        return http.put("/review-edit", data)
    }

    deleteReview(id, userId) {
        return http.delete(`/review-delete?id=${id}`, {data: {user_id: userId}})
    }

    getCuisines(id) {
        return http.get(`/cuisines`)
    }
}

export default new RestaurantDataService()