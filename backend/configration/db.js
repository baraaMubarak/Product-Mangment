const {MongoClient} = require('mongodb')

const dbConnection = (collection, cb) => {
    MongoClient.connect(process.env.DB_URI)
        .then(async client => {
            const db = client.db('MarketManagement').collection(collection)
            await cb(db)
            await client.close();
        })
        .catch()
}
module.exports = dbConnection
