var AWS = require("aws-sdk");

var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});
const tableName = "Todo";
exports.handler = async (event) => {
  console.log("Received : " + JSON.stringify(event, null, 2));
  let response = "";
  var params;
  try {
    var params = {
      TableName: tableName,
    };

    const obj = await documentClient.scan(params).promise();

    response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(obj),
    };
  } catch (exception) {
    console.log(exception);
    response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ "message:": exception }),
    };
  }
  return response;
};
