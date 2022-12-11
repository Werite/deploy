import dotenv from 'dotenv'
import aws from 'aws-sdk'
// import crypto from 'crypto'
// import { promisify } from "util"
// const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "ap-south-1"
const bucketName = "werite-video-recordings"
const accessKeyId = process.env.accessKeyId
const secretAccessKey = process.env.secretAccessKey

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL(recordingname) {
//   const rawBytes = await randomBytes(16)
  // const imageName = "video.webm"

  const params = ({
    Bucket: bucketName,
    Key: recordingname,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  // console.log(`uploadURL: ${uploadURL}`)
  return uploadURL
}