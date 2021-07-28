const db = require("../models"); // models path depend on your structure
const Currency = db.tutorials;


// function to check if currency exist on db or not
const isExist =  (fsyms, tsyms) => {
  return Currency.count({ where:  { FROMSYMBOL: fsyms, TOSYMBOL: tsyms } })
    .then(count => {
      if (count != 0) {
        return false;
      }
      return true;
  });
}


// create or update function 
exports.createOrupdate = ( { fsyms, tsyms, data } ) => {
    tsyms = tsyms.split(",");
    tsyms.map( single_tsyms => {

        if( isExist(fsyms, single_tsyms) ){

          // update current currency in the database
          Currency
            .update( data.fsyms.tsyms , { where: { TOSYMBOL: single_tsyms } })
            .then( () => {
                return { message: "Currency was updated successfully." }
            })
            .catch(err => {
                return { message: "Error updating Currency with id=" + tsyms }
            });

        }else{

          // Save Currency in the database
          Currency.create(data.fsyms.tsyms , { where: { TOSYMBOL: single_tsyms } })
          .then(data => {
            return data;
          })
          .catch(err => {
              return { "message": err.message || "Some error occurred while creating the Currency." }
          });
        }   
    })
};


  

exports.findAll = ( { fsyms, tsyms } ) => {

  tsyms = tsyms.split(",");
  var condition = { FROMSYMBOL: fsyms, TOSYMBOL: [] };

  while(tsyms.length > 0){
    condition.TOSYMBOL.push(tsyms.pop());
  }

  Currency.findAll({ where: condition })
    .then(data => {
      var result = { DISPLAY : {fsyms: [] }}
      data.map( item => result.DISPLAY.fsyms.push(item))
      return result
    })
    .catch(err => {
      return err.message || "Some error occurred while retrieving currencies.";
    });
};