import React from "react";
// import CreatableSelect from 'react-select/creatable';

const UniversalForm = (props) => {
  return (
    <div class="jumbotron">
      <form class="row g-3" onSubmit={props.upload}>
        <div class="input-group mb-3">
          <label class="input-group-text" for="file">
            File
          </label>
          <input type="file" class="form-control" id="file" />
        </div>
        <div class="input-group mb-3">
          <label class="input-group-text" for="preview">
            Preview
          </label>
          <input type="file" class="form-control" id="preview" />
        </div>

        <label for="keywords" class="form-label">
          Please add space seperated valid Keywords
        </label>
        <div class="input-group mb-3">
          <span class="input-group-text" id="basic-addon3">
            Keywords
          </span>
          <input
            type="text"
            class="form-control"
            id="keywords"
            aria-describedby="basic-addon3"
          />
        </div>

        <div class="input-group">
          <select
            class="form-select"
            id="type"
            aria-label="Example select with button addon"
          >
            <option value="image">Image</option>
            <option value="illustration">Illustration</option>
            <option class="disabled" value="image">
              Vector
            </option>
          </select>
          <button class="btn btn-outline-primary" type="submit">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UniversalForm;
