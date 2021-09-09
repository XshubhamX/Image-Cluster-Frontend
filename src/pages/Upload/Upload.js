import React, { useEffect, useState } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import imageCompression from "browser-image-compression";
import { UPLOAD_IMAGE } from "../../graphql/Mutation";
import CreatableSelect from "react-select/creatable";
import Dropdown from "react-dropdown";
import { Link } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Spinner from "../../components/Spinner";
import { AiOutlineArrowLeft } from "react-icons/ai";
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

const FileUpload = (props) => {
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
      props.history.push("/");
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
      props.history.push("/");
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
    <div className="upload-page">
      <Link
        to="/"
        style={{
          marginBottom: "105px",
          textDecoration: "none",
          marginTop: "-44px",
        }}
      >
        <AiOutlineArrowLeft /> <span>Home</span>
      </Link>
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
          <input id="file-upload" type="file" onChange={addFileHandler} />
        </div>
        {field === "Illustration" && (
          <div className="upload-page__preview-upload">
            <label for="file-upload2" class="custom-file-upload">
              <AiOutlineCloudUpload />
              <span>{previewName}</span>
            </label>
            <input id="file-upload2" type="file" onChange={addPreviewHandler} />
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
        <p style={{ marginTop: "18px", color: "red", fontSize: "14px" }}>
          *{wholeError}
        </p>
      ) : null}
    </div>
  );
};
export default FileUpload;
