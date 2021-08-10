import { gql } from "@apollo/client"

export const UPLOAD_IMAGE = gql`
mutation UploadFile(
  $type:String
  $keywords:[String!] 
  $file:Upload
  $preview:Upload
  ) {
    UploadFile(
      type: $type
      keywords: $keywords
      file:$file
      preview:$preview
    ) {
      key,
      error{
        subject
        message
      }
    }
  }
`