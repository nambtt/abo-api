import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";
import { LambdaRestApi, RestApi } from "aws-cdk-lib/aws-apigateway";

export interface TopCardProps {}

export class TopCard extends Construct {
	public readonly handler: lambda.IFunction;

	constructor(scope: Construct, id: string, props: TopCardProps) {
		super(scope, id);

		const s3Bucket = new s3.Bucket(this, "Bucket", {
			accessControl: s3.BucketAccessControl.PRIVATE,
			encryption: s3.BucketEncryption.S3_MANAGED,
			versioned: false,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
		});

		new BucketDeployment(this, "BucketDeployment", {
			sources: [Source.asset("./src/data")],
			destinationBucket: s3Bucket,
		});

		this.handler = new lambda.Function(this, "TopCardHandler", {
			runtime: lambda.Runtime.NODEJS_14_X,
			code: lambda.Code.fromAsset("src/lambda"),
			handler: "get-models.handler",
			environment: {
				BUCKET_NAME: s3Bucket.bucketName,
				FILE_NAME: "models.csv",
			},
		});

		s3Bucket.grantRead(this.handler);

		new LambdaRestApi(this, "TopCardEndpoint", {
			handler: this.handler,
		});
	}
}
