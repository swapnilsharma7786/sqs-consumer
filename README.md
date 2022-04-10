# sqs-consumer
Simple SQS functions to create, Update, Delete, Get Queues, publish and consume the messages.

**createQueue**
Create a New Queue

createQueue(params: Object): String
Parameters
params (Object)
Returns
String: AWS Queue Url

Example
createQueue({QueueName: 'SQS_QUEUE_NAME', Attributes: { 'DelaySeconds': '0', 'MessageRetentionPeriod': '86400'}})

**listQueues**
Get list of queues

listQueues(params: Object): Object
Parameters
params (Object = {})
Returns
Object: Array of Queue URL

**publishMessageToSQS**
Publish message to SQS

publishMessageToSQS(QueueUrl: String, message: String)
Parameters
QueueUrl (String) AWS url of the queue
message (String) Message Body
Example
publishMessageToSQS(`https://sqs.ap-south-1.amazonaws.com/9999999999999/demo-queue`, {text:'hello world!'});

**getQueueUrl**
get Queue Url using QueueName

getQueueUrl(QueueName: String): String
Parameters
QueueName (String)
Returns
String: QueueURL

**deleteQueue**
Delete Queue using QueueUrl

deleteQueue(QueueUrl: String): Object
Parameters
QueueUrl (String)
Returns
Object: { ResponseMetadata: { RequestId: '671cdfa4-ab4a-581f-bc1c-8568aa859bf3' } }

**startQueueConsumer**
SQS Consumer to consume messages from the Queue

startQueueConsumer(queueUrl: String): undefined
Parameters
queueUrl (String) Url of the Queue
Returns
undefined:
