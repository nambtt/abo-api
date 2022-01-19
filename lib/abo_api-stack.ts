import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { TopCard } from "./top-card";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AboApiStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		new TopCard(this, "TopCard", {});
	}
}
