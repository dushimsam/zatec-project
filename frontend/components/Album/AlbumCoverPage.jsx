// Import React hooks and components
import { useState, useEffect } from "react";
import  Router  from "next/router";
import Popup from "reactjs-popup";
import ModalWrapper from "../../components/Reusable/modals/ModalWrapper";
import { AlbumService, SongService } from "../../services";
import {CloudinaryService} from "../../services";
import { notifyError, notifySuccess } from "../../utils/alerts";
import AlbumFormInput from "../forms/CreateAlbum";
import SongFormInput from "../forms/CreateSong";
import Styles from "../../styles/components/AlbumCover.module.scss"
import DeleteConfirmation from "../Reusable/modals/DeleteConfirmationModal";


// Styles object for header and categories
const styles = {
  header: {
    height: "400px",
    width: "100%",
    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(/images/soundtrack.jpg)`,
    backgroundSize: "cover",
  },
  categories: {
    marginTop: "-100px",
  }
};

// Functional component for Album Cover Page
const AlbumCoverPage = ({item, setSongs, songs, setItem}) => {
  
  // State for form values, form validity, loading status, default file, and image URL
  const [values, setValues] = useState({
    title: "",
    length: 1,
    genre_id: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [defaultFile, setDefaultFile] = useState("");
  const [imgUrl, setImgUrl] = useState(null);

  // Function to create a song
  const Create = async () => {
    try {
      setLoading(true);
      let details = { ...values };
      details.album_id = item.id;
      details.genre_id = parseInt(values.genre_id);
      details.length = parseInt(values.length);
      const res = await SongService.create(details);
      notifySuccess(res.data.message);
      setSongs([...songs, res.data.model]);
    } catch (e) {
      notifyError(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // State for album values and function to fetch album by id
  const [albumValues, setAlbumValues] = useState({
    title: item.title,
    description: item.description,
    release_date: item.release_date,
  });

  useEffect(async () => {
    try {
      const res = await AlbumService.get_by_id(item.id);
      setAlbumValues({
        title: res.data.title,
        description: res.data.description,
        release_date: res.data.release_date,
      });
      setDefaultFile(res.data.cover_image_url);
    } catch (err) {
      // notifyError(err.response.message);
    }
  }, [item]);

  // Function to update album and upload cover image to Cloudinary
  const UpdateAlbum = async () => {
    try {
      setLoading(true);
      let update_details = {...albumValues};
      let res;
      if (imgUrl) {
        const cloudinaryService = new CloudinaryService(imgUrl);
        const uploadRes = await cloudinaryService.upload();
        update_details.cover_image_url = uploadRes.data.secure_url;
      }else{
        update_details.cover_image_url = defaultFile;
      }
      res = await AlbumService.update(item.id, update_details);
      notifySuccess(res.data.message);
      setItem(res.data.model)
    } catch (e) {
      notifyError(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle picture upload and set image URL
  const handleUploadPicture = (files) => {
    setImgUrl(files[0]);
  };

  // Function to delete an album
  const DeleteAlbum = async () => {
    try {
      setLoading(true);
      const res = await AlbumService.delete(item.id);
      notifySuccess(res.data.message);
      
      Router.push("/home#album")
    } catch (e) {
      notifyError(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 rounded" style={styles.header}>
          <div className="container">
            <div className="row justify-content-start">
              <div className="col-md-3 col-6 pt-4">
                <img
                  src={item.cover_image_url}
                  alt="cover-image"
                  className={"img-thumbnail "+Styles.image}
                />
              </div>
              <div className="col-md-5 col-6 pt-md-4">
                <h1
                  className={"text-light font-weight-bold mt-5 "+Styles.title}
                >{`${item.title}`}</h1>
                <p className="text-light">{`${item.description}`}</p>
                <Popup
                  trigger={
                    <button className="btn-dark px-3 py-2 rounded">
                      {" "}
                      EDIT DETAILS{" "}
                    </button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <ModalWrapper
                      title={`UPDATE ${item.title}`}
                      close={close}
                      btnActionText={"SAVE CHANGES"}
                      setLoading={setLoading}
                      loading={loading}
                      disable={isFormValid}
                      callFun={UpdateAlbum}
                      content={
                        <AlbumFormInput
                          handleUploadPicture={handleUploadPicture}
                          setIsFormValid={setIsFormValid}
                          setValues={setAlbumValues}
                          imgFile={imgUrl}
                          defaultFile={defaultFile}
                          status={"update"}
                          values={albumValues}
                        />
                      }
                    />
                  )}
                </Popup>
              </div>
            </div>
            <div className="row justify-content-between pt-5">
              <div className="col-md-4 col-12">
                <Popup
                  trigger={
                    <button
                      className="btn px-3 py-3 mr-2"
                      style={{ backgroundColor: "#3643c7" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path
                          d="M11 11V7h2v4h4v2h-4v4h-2v-4H7v-2h4zm1 11C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
                          fill="rgba(255,255,255,1)"
                        />
                      </svg>
                    </button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <ModalWrapper
                      title={`Add song to ${item.title}`}
                      close={close}
                      btnActionText={"CREATE"}
                      setLoading={setLoading}
                      loading={loading}
                      disable={isFormValid}
                      callFun={Create}
                      content={
                        <SongFormInput
                          setIsFormValid={setIsFormValid}
                          setValues={setValues}
                          addTo={"album"}
                          values={values}
                        />
                      }
                    />
                  )}
                </Popup>
               
                <Popup
                  trigger={ <button
                  className="btn px-2 py-2"
                  style={{ backgroundColor: "white" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm2 2v10h12V10H6zm3 2h2v6H9v-6zm4 0h2v6h-2v-6zM7 5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9z" />
                  </svg>
                </button> }
                  modal
                  nested
                >
                  {(close) => (
                     <DeleteConfirmation item={item} deleteItem={DeleteAlbum} loading={loading} setLoading={setLoading} title={"Are you sure you want to delete this album"} close={close} warningText={"All associated songs will be deleted as well !!!"}/>
                  )}
                </Popup>{" "}
              </div>
              <div className="col-4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumCoverPage;
