'use strict';
const request = require('request-promise');

module.exports = {
  get_sentiments: async (data) => {
      let documents = { 'documents': data }

      let body = JSON.stringify(documents);

      let response = await request.post({
        url : process.env.AZURE_API_URL,
        headers : {
            'Ocp-Apim-Subscription-Key' : process.env.AZURE_ACCESS_KEY,
        },
        body: body
      })

      let responseJson = JSON.parse(response)

      return responseJson
  }
}
