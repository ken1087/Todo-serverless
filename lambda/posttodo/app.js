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
    const id = event.requestContext.requestId;
    const body = JSON.parse(event.body);
    var params = {
      TableName: tableName,
      Item: {
        id: id,
        content: body.content,
      },
    };

    await documentClient.put(params).promise();

    response = {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ id: id }),
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
