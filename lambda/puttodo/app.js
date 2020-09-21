const AWS = require("aws-sdk");

var documentClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
});

const tableName = "Todo";

exports.handler = async (event) => {
  let response = "";
  var params;

  try {
    const id = event.pathParameters.id;
    const body = JSON.parse(event.body);
    var params = {
      TableName: tableName,
      Key: { id: id },
      UpdateExpression: "set #c = :content",
      ExpressionAttributeNames: { "#c": "content" },
      ExpressionAttributeValues: {
        ":content": body.content,
      },
    };

    await documentClient.update(params).promise();

    response = {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
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
