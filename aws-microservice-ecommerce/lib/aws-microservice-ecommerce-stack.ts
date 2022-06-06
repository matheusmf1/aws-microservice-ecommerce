import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class AwsMicroserviceEcommerceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);


    const productTable = new Table( this, "product", {

      partitionKey: {
        name: "id",
        type: AttributeType.STRING
      },
      tableName: 'product',
      removalPolicy: RemovalPolicy.DESTROY,
      billingMode: BillingMode.PAY_PER_REQUEST
    });


    const productLambdaFuntion = new NodejsFunction( this, 'ProductFunction', {

      entry: path.join(__dirname, './scr/product.index.js'),

      bundling: {
        externalModules: [
          'aws-sdk'
        ]
      },

      environment: {
        PRIMARY_KEY: 'id',
        DYNAMODB_TABLE_NAME: productTable.tableName
      },

      runtime: Runtime.NODEJS_16_X

    });


    //alow lambda to access dynamoDB Table
    productTable.grantReadWriteData( productLambdaFuntion );

  }
}
