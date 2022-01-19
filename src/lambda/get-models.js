const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const bucketName = process.env.BUCKET_NAME;
const fileName = process.env.FILE_NAME;
const client = new S3Client();

exports.handler = async function (event, context) {

	try {
		const cmd = new GetObjectCommand({ Bucket: bucketName, Key: fileName });
		const data = await client.send(cmd);
		return {
			statusCode: 200,
			headers: { "content-type": "application/json" },
			body: JSON.stringify(data),
		};
	} catch (err) {
		return {
			statusCode: 400,
			headers: {},
			body: JSON.stringify("Woopis"),
			error: error
		};
	}
};
