// Import React hooks and components
import { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import ModalWrapper from "../../components/Reusable/modals/ModalWrapper";
import { GenreService, SongService } from "../../services";
import { notifyError, notifySuccess } from "../../utils/alerts";
import GenreFormInput from "../forms/CreateGenre";
import SongFormInput from "../forms/CreateSong";
import DeleteConfirmation from "../Reusable/modals/DeleteConfirmationModal";
import Router from "next/router";

// Styles object for header and categories
const styles = {
  header: {
    height: "300px",
    width: "100%",
    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.8)),url(/images/soundtrack.jpg)`,
    backgroundSize: "cover",
  },
  categories: {
    marginTop: "-100px",
  },
};

// Functional component for Genre Cover Page
const GenreCoverPage = ({ item, setItem, setSongs, songs }) => {
  // State for form values, form validity, loading status
  const [values, setValues] = useState({
    title: "",
    length: 1,
    album_id: "",
  });

  // State for form values, form validity, loading status
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const [genreValues, setGenreValues] = useState({
    type: "",
  });

  // Function to create a song
  const Create = async () => {
    try {
      let details = { ...values };

      details.genre_id = item.id;
      details.album_id = parseInt(values.album_id);
      details.length = parseInt(values.length);

      setLoading(true);
      const res = await SongService.create(details);
      notifySuccess(res.data.message);
      setSongs([...songs, res.data.model]);
    } catch (e) {
      notifyError(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // State for genre values and function to fetch genre by id
  useEffect(async () => {
    try {
      const res = await GenreService.get_by_id(item.id);
      setGenreValues({
        type: res.data.type,
      });
    } catch (e) {
      // notifyError(e.response.message);
    }
  }, [item]);

  // Function to create a genre
  const UpdateGenre = async () => {
    try {
      const res = await GenreService.update(item.id, genreValues);
      setItem(res.data.model);
      notifySuccess(res.data.message);
    } catch (e) {
      notifyError(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a genre
  const DeleteGenre = async () => {
    try {
      setLoading(true);
      const res = await GenreService.delete(item.id);
      notifySuccess(res.data.message);
      Router.push("/home#genre");
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
              <div className="col-12 pt-4">
                <h2 className="text-light font-weight-bold">{`${item.type}`}</h2>
                <p className="text-light">{`There are ${songs.length} songs under this category`}</p>
                <Popup
                  trigger={
                    <button className="btn-dark px-md-3 py-md-2 rounded">
                      {" "}
                      EDIT DETAILS{" "}
                    </button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <ModalWrapper
                      title={`UPDATE ${item.type}`}
                      close={close}
                      btnActionText={"SAVE CHANGES"}
                      setLoading={setLoading}
                      loading={loading}
                      disable={isFormValid}
                      callFun={UpdateGenre}
                      content={
                        <GenreFormInput
                          setIsFormValid={setIsFormValid}
                          setValues={setGenreValues}
                          status={"update"}
                          values={genreValues}
                        />
                      }
                    />
                  )}
                </Popup>
              </div>
            </div>
            <div className="row justify-content-between pt-md-5 pt-2">
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
                      title={`Add song to ${item.type}`}
                      loading={loading}
                      close={close}
                      btnActionText={"CREATE"}
                      setLoading={setLoading}
                      disable={isFormValid}
                      callFun={Create}
                      content={
                        <SongFormInput
                          setIsFormValid={setIsFormValid}
                          setValues={setValues}
                          addTo={"genre"}
                          values={values}
                        />
                      }
                    />
                  )}
                </Popup>
                <Popup
                  trigger={
                    <button
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
                    </button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <DeleteConfirmation
                      item={item}
                      deleteItem={DeleteGenre}
                      loading={loading}
                      setLoading={setLoading}
                      title={"Are you sure you want to delete this genre"}
                      close={close}
                      warningText={
                        "All associated songs will be deleted as well !!!"
                      }
                    />
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

export default GenreCoverPage;
