const aws = require('aws-sdk');
const {Consumer} = require('sqs-consumer');
const config = require('../config');

aws.config.update({
    secretAccessKey: config.AWS_SECRET_KEY,
    accessKeyId: config.AWS_ACCESS_KEY,
    region: config.AWS_REGION
});

// Create an SQS service object
const sqs = new aws.SQS({apiVersion: config.AWS_API_VERSION});

/**
 * @description Create Queue
 * @param {Object} params
 * @returns {String} AWS Queue Url
 * @example createQueue({QueueName: 'SQS_QUEUE_NAME', Attributes: { 'DelaySeconds': '0', 'MessageRetentionPeriod': '86400'}})
 */
function createQueue(params) {
    sqs.createQueue(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            return;
        } else {
            console.log("Success", data.QueueUrl);
            return data.QueueUrl;
        }
    });
}

/**
 * @description Get list of queues
 * @param {Object} params
 * @returns {Object} Array of Queue URL
 */
function listQueues(params = {}){
    sqs.listQueues(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            return [];
        } else {
            console.log("Success", data.QueueUrls);
            return data.QueueUrls;
        }
    });
}
;

/**
 * @description Publish message to SQS
 * @param {String} QueueUrl AWS url of the queue
 * @param {String} message Message Body
 * @example publishMessageToSQS(`https://sqs.ap-south-1.amazonaws.com/9999999999999/demo-queue`, {text:'hello world!'});
 */
function publishMessageToSQS(QueueUrl, message) {
    const params = {
        MessageBody: JSON.stringify(message),
        QueueUrl: QueueUrl
    };
    sqs.sendMessage(params, (err, resp) => {
        if (err) {
            console.log("Error: publishMessageToSQS", err, QueueUrl);
            return err;
        }
        console.log("Message published to SQS", QueueUrl, resp);
        return resp;
    });
}

/**
 * @description get Queue Url using QueueName
 * @param {String} QueueName
 * @returns {String} QueueURL
 */
function getQueueUrl(QueueName) {
    sqs.getQueueUrl({
        QueueName: QueueName
    }, function (err, data) {
        if (err) {
            console.log("Error", err);
            return;
        } else {
            console.log("Success", data.QueueUrl);
            return data.QueueUrl;
        }
    });
}

/**
 * @description Delete Queue using QueueUrl
 * @param {String} QueueUrl
 * @returns {Object} { ResponseMetadata: { RequestId: '671cdfa4-ab4a-581f-bc1c-8568aa859bf3' } }
 */
function deleteQueue(QueueUrl) {
    sqs.deleteQueue({
        QueueUrl: QueueUrl
    }, function (err, data) {
        if (err) {
            console.log("Error", err);
            return;
        } else {
            console.log("Success", data);
            return data.QueueUrl;
        }
    });
}

/**
 * @description SQS Consumer to consume messages from the Queue
 * @param {String} queueUrl Url of the Queue 
 * @returns {undefined}
 */
function startQueueConsumer(queueUrl) {
    const app = Consumer.create({
        queueUrl: queueUrl,
        handleMessage: async (message) => {
            console.log("queueName : ", queueUrl, " message : ", message);
        },
        sqs: sqs
    });

    app.on('error', (err) => {
        console.error("error : ", err.message);
    });

    app.on('processing_error', (err) => {
        console.error("processing_error : ", err.message);
    });

    app.on('timeout_error', (err) => {
        console.error("timeout_error : ", err.message);
    });

    app.start();
}

//createQueue({QueueName: 'demo-queue-2', Attributes: { 'DelaySeconds': '0', 'MessageRetentionPeriod': '86400'}});
//listQueues();
//publishMessageToSQS(`https://sqs.ap-south-1.amazonaws.com/9999999999999/demo-queue`, {text:'hello world!'});
//getQueueUrl('demo-queue-1');
//deleteQueue(`https://sqs.ap-south-1.amazonaws.com/9999999999999/demo-queue`);
//startQueueConsumer(`https://sqs.ap-south-1.amazonaws.com/9999999999999/demo-queue`);

module.exports = {
    createQueue,
    listQueues,
    publishMessageToSQS,
    getQueueUrl,
    deleteQueue,
    startQueueConsumer
};
