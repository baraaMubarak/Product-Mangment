const productRouter = require('./products')
module.exports = (app) => {
    app.use('/product',productRouter)
}