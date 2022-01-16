import * as cdk from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import { IBucket } from "@aws-cdk/aws-s3";

export interface LambdasProps {
	bucket: IBucket;
}

export class Lambdas extends cdk.Construct {
	constructor(scope: cdk.Construct, id: string, props: LambdasProps) {
		super(scope, id);

		const handler = new lambda.Function(this, "GetModelsFunction", {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset("src/functions"),
			handler: "get-models.handler",
			environment: {
				BUCKET: props.bucket.bucketName,
			},
		});

		props.bucket.grantRead(handler);

		new apigateway.LambdaRestApi(this, "GetModelRestApi", {
			handler: handler,
		});
	}
}
