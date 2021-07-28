
const controller = require('./controllers')

module.exports = (app) => {
    
    app.route('/service/price')
       .get(controller.get_currency_data)
}