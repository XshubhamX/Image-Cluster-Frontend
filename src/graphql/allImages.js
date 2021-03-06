import { gql } from "@apollo/client";

export const ALL_IMAGES = gql`
  query allImages {
    allImages {
      images {
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
