import { gql } from "@apollo/client";

export const ALL = gql`
  query getAll {
    getAll {
      all {
        file
        preview
      }
      error {
        subject
        message
      }
    }
  }
`;
