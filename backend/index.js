import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import restaurantsDAO from './dao/restaurantsDAO.js'
import reviewsDAO from './dao/reviewsDAO.js'

dotenv.config()

const mongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

mongoClient.connect(process.env.DB_URI,
    {poolSize: 50, wtimeout: 2500, useNewUrlParser: true}
    ).catch(error => {
        console.error(error.status)
        process.emit(1)
    }).then(async client => {
        /* Injecting Database before Starting Server */
        await restaurantsDAO.injectDB(client)
        await reviewsDAO.injectDB(client)
        /* Starting Server */
        app.listen(port, () => {
            console.log(`Server listening on Port: ${port}`)
        })
    })
