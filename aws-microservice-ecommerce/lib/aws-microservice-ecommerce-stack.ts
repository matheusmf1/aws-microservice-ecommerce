import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb'
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

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

    const lambdaFunction = new Function( this, 'ProductFuntion', {

      runtime: Runtime.NODEJS_16_X,
      handler: 'index.handler',
      code: Code.fromAsset( path.join( __dirname, 'lambda-handler' ) )

    });



  }
}
