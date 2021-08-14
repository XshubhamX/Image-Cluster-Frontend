import { gql } from "@apollo/client"

export const ALL_IMAGES = gql`
query allImages{
    allImages(
      skip: 0
      limit: 15
    ) {
    images{
      file,
      preview
    }
    error{
        subject
        message
      }
  }
}
`