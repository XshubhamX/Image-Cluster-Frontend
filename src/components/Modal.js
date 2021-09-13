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

const types = ["Image", "Illustration"];
const components = {
  DropdownIndicator: null,
};

const SEARCH_IMAGE = gql`
  query search($key: String!) {
    search(field: "all", key: $key) {
      payload
    }
  }
`;

const Modal = ({ showModal, setShowModal }) => {
  const [keywords, setKeywords] = useState([]);
  const [field, setField] = useState("Image");
  const [inputValue, setInputValue] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Upload file");
  const [preview, setPreview] = useState(null);
  const [previewName, setPreviewName] = useState("Upload Preview");
  const [wholeError, setWholeError] = useState(null);
  const [k, setK] = useState([0, 0, 0]);
  const [mainError, setMainError] = useState(true);

  const [mutate, { loading }] = useMutation(UPLOAD_IMAGE);

  const { data } = useQuery(SEARCH_IMAGE, {
    variables: {
      key: inputValue,
    },
  });

  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (data && data.search.payload) {
      const options_set = data.search.payload.map((opt) => ({
        label: opt,
        value: opt,
      }));
      setOptions(options_set);
    } else {
      setOptions([]);
    }
  }, [data, k, mainError, field]);

  const errorChecker = () => {
    let y = 1;

    if (field === "Image") {
      for (let i = 0; i < 2; i++) {
        y = y * k[i];
      }
    } else if (field === "Illustration") {
      for (let i = 0; i < 3; i++) {
        y = y * k[i];
      }
    }
    if (y) {
      setMainError(false);
    } else {
      setMainError(true);
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    let keys = keywords.map((x) => x.value);
    if (!keys.length) {
      setWholeError("Please add some keywords");
      return;
    }
    if (field === "Image") {
      // const compressed = await imageCompression(file, options);
      // const { data } = await mutate({
      //   variables: {
      //     file,
      //     keywords: keys,
      //     type: field.toLowerCase(),
      //     preview: compressed,
      //   },
      // });
      // if (data) {
      setShowModal(false);
      // }
      return;
    } else if (field === "Illustration") {
      // const compressed = await imageCompression(preview, options);
      // const { data } = await mutate({
      //   variables: {
      //     file,
      //     keywords: keys,
      //     type: field.toLowerCase(),
      //     preview: compressed,
      //   },
      // });
      // if (data) {
      setShowModal(false);
      // }
      return;
    }
  };

  if (loading) return <Spinner />;
  const handleMultiInputChange = (inputValue) => {
    setInputValue(inputValue);
  };
  const handleSkillChange = (value, actionMeta) => {
    setKeywords(value);
    if (value.length) {
      let y = k;
      y[0] = 1;
      setK(y);
    } else {
      let y = k;
      y[0] = 0;
      setK(y);
    }
    errorChecker();
  };
  const handelOnChange = (e) => {
    if (keywords.length) {
      setK([1, 0, 0]);
    } else {
      setK([0, 0, 0]);
    }
    setMainError(true);
    setField(e.value);
    setFile(null);
    setPreview(null);
    setFileName("Upload file");
    setPreview("Upload preview");
  };

  // if (wholeError) return <div>{JSON.stringify(error, null, 2)}</div>;

  const addFileHandler = (e) => {
    const x = e.target.files[0];
    console.log(x);
    if (field === "Image") {
      if (
        !x ||
        !x["type"].includes("image") ||
        x["type"].includes("image/svg")
      ) {
        setWholeError("Please upload file of image type");
        return;
      }
    } else if (field === "Illustration") {
      if (
        !x ||
        !["application/postscript", "image/svg+xml"].includes(x["type"])
      ) {
        console.log(!x["type"].includes("image/svg"));
        setWholeError("Please upload file of illustration type");
        return;
      }
    }
    let y = k;
    y[1] = 1;
    setK(y);
    setWholeError(null);
    setFile(x);
    setFileName(x.name);
    errorChecker();
  };
  const addPreviewHandler = (e) => {
    const x = e.target.files[0];
    if (!x || !x["type"].includes("image")) {
      setWholeError("Please upload file of image type");
      return;
    }
    let y = k;
    y[2] = 1;
    setK(y);
    setWholeError(null);

    setPreview(x);
    setPreviewName(x.name);
    errorChecker();
  };
  return (
    <>
      {showModal ? (
        <>
          <Background>
            <ModalWrapper showModal={showModal}>
              <div className="upload-page">
                <Link
                  to="/"
                  style={{
                    marginBottom: "105px",
                    textDecoration: "none",
                    marginTop: "-44px",
                  }}
                ></Link>
                <h1 className="upload-page__title">Upload Files</h1>
                <p className="upload-page__form-label">Keywords</p>
                <div className="upload-page__selects">
                  <CreatableSelect
                    inputValue={inputValue}
                    isMulti
                    onInputChange={handleMultiInputChange}
                    onChange={handleSkillChange}
                    components={components}
                    isClearable={false}
                    backspaceRemoves={false}
                    // menuIsOpen={false}
                    placeholder="Type something and press enter..."
                    // value={keywords}
                    options={options}
                  />
                </div>

                <div className="upload-page__form-control">
                  <Dropdown
                    options={types}
                    onChange={handelOnChange}
                    value={field}
                    placeholder="Select an option"
                  />
                  <div className="upload-page__form-control-form">
                    <label for="file-upload" class="custom-file-upload">
                      <AiOutlineCloudUpload />
                      <span>{fileName}</span>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      onChange={addFileHandler}
                    />
                  </div>
                  {field === "Illustration" && (
                    <div className="upload-page__preview-upload">
                      <label for="file-upload2" class="custom-file-upload">
                        <AiOutlineCloudUpload />
                        <span>{previewName}</span>
                      </label>
                      <input
                        id="file-upload2"
                        type="file"
                        onChange={addPreviewHandler}
                      />
                    </div>
                  )}
                </div>
                <button
                  className="upload-page__btn"
                  onClick={uploadFile}
                  disabled={mainError}
                >
                  Upload
                </button>
                {wholeError && (!file || !preview) ? (
                  <p
                    style={{
                      marginTop: "18px",
                      color: "red",
                      fontSize: "14px",
                    }}
                  >
                    *{wholeError}
                  </p>
                ) : null}
              </div>
              <CloseModalButton onClick={() => setShowModal(!showModal)} />
            </ModalWrapper>
          </Background>
        </>
      ) : null}
    </>
  );
};

export default Modal;
