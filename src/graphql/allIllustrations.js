import { gql } from "@apollo/client";

export const ALL_ILLUSTRATIONS = gql`
  query {
    allIllustrations {
      illus {
        file
        preview
      }
    }
  }
`;
