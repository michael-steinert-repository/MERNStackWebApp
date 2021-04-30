let restaurants

export default class RestaurantsDAO {
    /* Initial Connect to Database as soon as the Server starts */
    static async injectDB(connection) {
        if (restaurants) {
            return
        }
        try {
            /* Filled Reference to specific Database */
            restaurants = await connection.db(process.env.NS).collection("restaurants")
        } catch (error) {
            console.error(`Unable to establish a Collection handle in restaurantsDAO.js: ${error}`)
        }
    }

    static async getRestaurants({filters = null, page = 0, restaurantsPerPage = 20} = {}) {
        let query
        if (filters) {
            /* Creating MongoDB Queries */
            if ("name" in filters) {
                query = {$text: {$search: filters["name"]}}
            } else if ("cuisine" in filters) {
                query = {"cuisine": {$eq: filters["cuisine"]}}
            } else if ("zipcode" in filters) {
                query = {"address.zipcode": {$eq: filters["zipcode"]}}
            }
        }

        let cursor

        try {
            cursor = await restaurants.find(query)
        } catch (error) {
            console.error(`Unable to excecute the Find Command: $ {error}`)
            return {restaurantsList: [], totalNumberOfRestaurants: 0}
        }

        const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

        try {
            const restaurantsList = await displayCursor.toArray()
            const totalNumberOfRestaurants = restaurants.countDocuments(query)

            return {restaurantsList, totalNumberOfRestaurants}
        } catch (error) {
            console.error(`Unable to convert to an Array or Problem with counting Documents: $ {error}`)
            return {restaurantsList: [], totalNumberOfRestaurants: 0}
        }
    }
}