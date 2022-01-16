import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import { BucketDeployment, Source } from "@aws-cdk/aws-s3-deployment";

export interface AssetStorageProps {}

export class AssetStorage extends cdk.Construct {
	public readonly aboModelsBucket: s3.IBucket;

	constructor(scope: cdk.Construct, id: string, props: AssetStorageProps) {
		super(scope, id);

		this.aboModelsBucket = new s3.Bucket(this, "aboModelsBucket", {
			bucketName: "abo-models",
			accessControl: s3.BucketAccessControl.PRIVATE,
			encryption: s3.BucketEncryption.S3_MANAGED,
			versioned: false,
			blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
		});

		new BucketDeployment(this, "DeployModelsFile", {
			sources: [Source.asset("./src/data")],
			destinationBucket: this.aboModelsBucket,
		});
	}
}
