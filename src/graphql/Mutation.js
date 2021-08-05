import { gql } from "@apollo/client"

export const UPLOAD_IMAGE = gql`
mutation UploadFile(
  # $type:String
  $keywords:[String!] 
  $file:Upload
  ) {
    UploadFile(
      # type: $type
      keywords: $keywords
      file:$file
    ) {
      key,
      error{
        subject
        message
      }
    }
  }
`