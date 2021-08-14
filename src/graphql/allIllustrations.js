import { gql } from "@apollo/client"

export const ALL_ILLUSTRATIONS = gql`
query allIllustrations{
  allIllustrations(skip:0,limit:1){
    illus{
      file,
      preview
    }
    error{
      message
    }
  }
}
`