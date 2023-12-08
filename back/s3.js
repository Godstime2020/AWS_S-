import dotenv from 'dotenv'
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "us-east-1"
const bucketName = "goanaymouz"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID 
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY 

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const fileName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: fileName,
    Expires: 120
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}