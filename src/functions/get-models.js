const AWS = require("aws-sdk");
const S3 = new AWS.S3();

const bucketName = process.env.BUCKET;

exports.handler = async function (event, context) {
	let data = {}
	try {
		console.log("Entering lambda already hotswap ~15s!");
		data = await S3.listObjectsV2({ Bucket: bucketName }).promise();
		console.log(data);
	} catch (error) {
		console.log(`error: ${error}`);
		return {
			statusCode: 400,
			headers: {},
			body: JSON.stringify("Woopis"),
			error: error
		};
	}
	return {
		statusCode: 200,
		headers: { "content-type": "application/json" },
		body: JSON.stringify(data),
	};
};
