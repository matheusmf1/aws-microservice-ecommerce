//Create service client module
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

//Create an DynamoDB service client object
const ddbClient = new DynamoDBClient();
export { ddbClient };