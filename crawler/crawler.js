const axios = require('axios');
//get .then()
axios
  .get('https://www.twse.com.tw/exchangeReport/STOCK_DAY', {
    params: {
      response: 'json',
      date: 20220813,
      stockNo: 2330,
    },
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((err) => {
    console.error(err);
  });
