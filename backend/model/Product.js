const {dbConnection} = require('../configration/index')

class Product {
    constructor(productData) {
        this.productData = productData;
    }

    save() {
        dbConnection('product', async (collection) => {
            if(!(await collection.findOne(this.productData))){
                await collection.insertOne(this.productData)
            }else{
                throw new Error('sdd')
            }
        })
    }

    getAllProducts(cb){
        dbConnection('product', async (collection) => {
            cb(await collection.find().toArray())
        })
    }
}
module.exports = Product