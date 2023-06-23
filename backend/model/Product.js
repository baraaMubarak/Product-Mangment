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

    getProductByCode(code, cb){
        dbConnection('product', async (collection) => {
            cb(await collection.findOne({code:code}))
        })
    }
}
module.exports = Product