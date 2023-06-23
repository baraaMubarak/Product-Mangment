const {MongoClient} = require('mongodb')

const _uri = "mongodb://127.0.0.1:27017"
const dbConnection = (collection, cb) => {
    MongoClient.connect(_uri)
        .then(async client => {
            const db = client.db('MarketManagement').collection(collection)
            await cb(db)
            await client.close();
        })
        .catch()
}
module.exports = dbConnection
