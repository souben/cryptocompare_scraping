
module.exports = (sequelize, Sequelize) => {
    const Currency = sequelize.define("currency", 
        {
            FROMSYMBOL: { type: Sequelize.STRING},
            TOSYMBOL: { type: Sequelize.STRING},
            CHANGE24HOUR: { type: Sequelize.STRING },
            CHANGEPCT24HOUR: { type: Sequelize.STRING },
            OPEN24HOUR: { type: Sequelize.STRING },
            VOLUME24HOUR: { type: Sequelize.STRING },
            VOLUME24HOURTO: { type: Sequelize.STRING },
            LOW24HOUR: { type: Sequelize.STRING },
            HIGH24HOUR: { type: Sequelize.STRING },
            PRICE: { type: Sequelize.STRING },
            SUPPLY: { type: Sequelize.STRING },
            MKTCAP: { type: Sequelize.STRING }
        }
    )

    return Currency;

}