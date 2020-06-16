import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";

const GET_MOVIE = gql`
  query getMovie($id: Int) {
    movie(id: $id) {
      id
      title
      medium_cover_image
      description_intro
    }
  }
`;

export default () => {
  const { id } = useParams();
  console.log(id);
  return "Detail";
};
