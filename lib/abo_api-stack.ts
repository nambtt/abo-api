import * as cdk from "@aws-cdk/core";
import { Lambdas } from "./core/lambdas";
import { AssetStorage } from "./core/storage";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AboApiStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const storage = new AssetStorage(this, "Storage", {});

		new Lambdas(this, "Lambdas", {
			bucket: storage.aboModelsBucket,
		});
	}
}
