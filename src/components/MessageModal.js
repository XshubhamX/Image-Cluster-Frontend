import React, { useState, useEffect } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import Spinner from "./Spinner";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Link } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import Dropdown from "react-dropdown";
import { UPLOAD_IMAGE } from "../graphql/Mutation";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { AiFillWarning } from "react-icons/ai";
import { IoCloudDone } from "react-icons/io5";
const Background = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999999999999999999999999999999999999999999999999999999999999999999999999999999;
`;

const ModalWrapper = styled.div`
  /* width: 800px; */
  /* height: 500px; */
  height: 15rem;
  width: 20rem;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background-color: #fff;
  color: black;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 90;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    & h3 {
      margin-bottom: 1rem;
      color: var(--gray-600);
      font-size: 1.3rem;
    }

    & p {
      color: var(--gray-500);
      font-size: 0.9rem;
      font-weight: 500;
      text-align: center;
      width: 80%;
    }
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

const WarningIcon = styled(AiFillWarning)`
  font-size: 3rem;
  color: red;
`;
const Success = styled(IoCloudDone)`
  font-size: 3rem;
  color: green;
`;

const Modal = ({ showModal, setShowModal }) => {
  return (
    <>
      {showModal ? (
        <>
          <Background>
            <ModalWrapper showModal={showModal}>
              <h1>fefwefe</h1>
            </ModalWrapper>
          </Background>
        </>
      ) : null}
    </>
  );
};

export default Modal;
