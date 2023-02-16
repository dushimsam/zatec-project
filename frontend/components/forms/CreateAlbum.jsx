import { useEffect, useState } from "react";
import Styles from "../../styles/components/Forms.module.scss";
import InputControl from "../Reusable/InputControl";
import { InputTextArea } from "../Reusable/InputControl";
import { isThisFormValid } from "../../utils/functions";
import { ACCEPTED_FILE_TYPES } from "../../utils/constants";
import { ImageContainer } from "../widgets/ImageContainer";
const AlbumFormInput = ({
  setIsFormValid,
  setValues,
  status,
  values,
  imgFile,
  handleUploadPicture,
  defaultFile
}) => {
  const [valid, setValid] = useState({
    title: !!status,
    release_date: !!status,
    description: !!status,
  });

  useEffect(() => {
    setIsFormValid(isThisFormValid(valid));
  }, [valid]);

  const handleChangeV2 =
    (prop) =>
    ({ value, valid: validProp }) => {
      setValues({ ...values, [prop]: value });
      setValid((state) => ({ ...state, [prop]: validProp }));
    };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 mt-2">
          <div className="form-group">
            <InputControl
              handleChangeV2={handleChangeV2("title")}
              value={values.title}
              label="Title"
              type="text"
              validations="required|string|min:3"
            />
          </div>
          <div className="form-group">
            <InputControl
              handleChangeV2={handleChangeV2("release_date")}
              value={values.release_date}
              label="Release Date"
              type="date"
            />
          </div>

          <div className="form-group">
            <InputTextArea
              handleChangeV2={handleChangeV2("description")}
              value={values.description}
              label="Description"
              type="text"
              validations="required|string|min:3"
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          {status === "update" ? (
            <div className="form-group col-7 px-0 mt-2">
              <h6 className={"font-weight-bold"}>Existing Picture</h6>
              <ImageContainer file={defaultFile} status={status} />
            </div>
          ) : null}
          <div className="form-group col-12 px-0">
            <h6 className={"font-weight-bold mt-5"}>Choose Cover Picture</h6>
            <input
              type="file"
              hidden={true}
              name={"image"}
              className={"form-control-file"}
              id={"uploadImage"}
              accept={ACCEPTED_FILE_TYPES}
              onChange={(e) => {
                handleUploadPicture(e.target.files);
                e.target.value = "";
              }}
              required
            />
            <div
              className="bg-secondary d-inline-block p-4 cursor-pointer rounded shadow-sm"
              onClick={() => {
                document.getElementById("uploadImage").click();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32"
                height="32"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path
                  d="M9 3h6l2 2h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4l2-2zm3 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0-2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
                  fill="rgba(236,240,241,1)"
                />
              </svg>
            </div>
          </div>
          <div className="form-group col-12 px-0">
            {imgFile && <ImageContainer file={imgFile} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumFormInput;
