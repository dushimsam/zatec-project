// Import React hooks and components
import { useEffect, useState } from "react";
import { SongService } from "../../services";
import styles from "../../styles/components/SongCard.module.scss";
import Styles from "../../styles/components/GenreCard.module.scss";
import { notifyError, notifySuccess } from "../../utils/alerts";
import Popup from "reactjs-popup";
import ModalWrapper from "../../components/Reusable/modals/ModalWrapper";
import SongFormInput from "../forms/CreateSong";
import DeleteConfirmation from "../Reusable/modals/DeleteConfirmationModal";

const SongCard = ({ status, song, index, item, removeSong }) => {
  // State variables to hold the current song and form input values
  const [currSong, setCurrSong] = useState({
    title: "",
    length: 1,
    album: { title: "" },
    genre: { type: "" },
  });
  const [values, setValues] = useState({
    title: "",
    length: 1,
    album_id: "",
    genre_id: "",
  });

  // State variables to track form validity and loading state
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update the state variables when the song prop changes
  useEffect(() => {
    setCurrSong(song);
    setValues({
      title: song.title,
      length: song.length,
      album_id: status === "album" ? item.id : song.album?.id,
      genre_id: status === "genre" ? item.id : song.genre?.id,
    });
  }, [song]);

  // Function to update the song
  const Update = async () => {
    try {
      let details = { ...values };

      // Convert album_id, genre_id, and length to integers
      details.album_id = parseInt(details.album_id);
      details.genre_id = parseInt(details.genre_id);
      details.length = parseInt(values.length);

      // Set loading state to true and send update request to API
      setLoading(true);
      const res = await SongService.update(currSong.id, details);
      notifySuccess(res.data.message);
      setCurrSong(res.data.model);
    } catch (e) {
      // If update request fails, notify user of error
      notifyError(e.response?.data?.message);
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  };

  // Function to delete the song
  const DeleteSong = async () => {
    try {
      // Set loading state to true and send delete request to API
      setLoading(true);
      const res = await SongService.delete(currSong.id);

      // If delete request is successful, notify user and remove song from list
      notifySuccess(res.data.message);
      removeSong(currSong);
    } catch (e) {
      // If delete request fails, notify user of error
      notifyError(e.response?.data?.message);
    } finally {
      // Set loading state to false
      setLoading(false);
    }
  };
  
  // JSX to render the song card
  return (
    <tr className={`${styles.card}`}>
      <td>{index + 1}</td>
      <td>
        <button className="btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="35"
            height="35"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM10.622 8.415a.4.4 0 0 0-.622.332v6.506a.4.4 0 0 0 .622.332l4.879-3.252a.4.4 0 0 0 0-.666l-4.88-3.252z"
              fill="#51288d"
            />
          </svg>
        </button>
      </td>
    
      <td>{currSong.title}</td>
      {status === "all" || status === "genre" ? (
        <td>{currSong.album?.title}</td>
      ) : (
        <></>
      )}
      {status === "all" || status === "album" ? (
        <td>{currSong.genre?.type}</td>
      ) : (
        <></>
      )}
      <td>{`${currSong.length} min`}</td>
      <td>
        <Popup
          trigger={
            <button className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M5 19h1.414l9.314-9.314-1.414-1.414L5 17.586V19zm16 2H3v-4.243L16.435 3.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L9.243 19H21v2zM15.728 6.858l1.414 1.414 1.414-1.414-1.414-1.414-1.414 1.414z" />
              </svg>
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <ModalWrapper
              title={`Update song, ${currSong.title}`}
              loading={loading}
              close={close}
              btnActionText={"SAVE CHANGES"}
              setLoading={setLoading}
              disable={isFormValid}
              callFun={Update}
              content={
                <SongFormInput
                  status={"update"}
                  setIsFormValid={setIsFormValid}
                  setValues={setValues}
                  addTo={"all"}
                  values={values}
                />
              }
            />
          )}
        </Popup>
        <Popup
          trigger={
            <button className="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 8h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8zm3-3V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v2h5v2H2V5h5zm2-1v1h6V4H9zm0 8v6h2v-6H9zm4 0v6h2v-6h-2z" />
              </svg>
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <DeleteConfirmation
              deleteItem={DeleteSong}
              loading={loading}
              setLoading={setLoading}
              title={"Are you sure you want to delete this song"}
              close={close}
            />
          )}
        </Popup>{" "}
      </td>
    </tr>
  );
};
const SongsSection = ({
  showTitle,
  setCurrPage,
  currPage,
  totalSongs,
  setSongs,
  item,
  songs,
  status,
}) => {
  const removeSong = (item) => {
    const newSongs = songs.filter((song) => song.id !== item.id);
    setSongs(newSongs);
  };
  return (
    <div className="container-fluid">
      {showTitle && (
        <div className="row justify-content-start">
          <div className="col-10">
            <h2 className="text-left">Recommendations</h2>
            <span className="text-dark">{`${totalSongs} songs`}</span>
          </div>
        </div>
      )}
      <div className="row justify-content-center">
        <div className="col-12 table-responsive">
          <table className="table">
            <thead>
              <tr className="font-weight-bold">
                <th scope="col">#</th>
                <th scope="col"></th>
                <th scope="col">Title</th>
                {status === `all` || status === "genre" ? (
                  <th scope="col">Album</th>
                ) : (
                  <></>
                )}
                {status === "all" || status === "album" ? (
                  <th scope="col">Genre</th>
                ) : (
                  <></>
                )}
                <th scope="col">Length</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {songs.length == 0 && (
                <div className="row justify-content-center pt-5">
                  <div className="col-5">
                    No songs available{" "}
                    {status !== "all" ? "under this category " : ""}.
                  </div>
                </div>
              )}

              {songs.map((song, index) => (
                <SongCard
                  song={song}
                  key={index}
                  index={index}
                  item={item}
                  removeSong={removeSong}
                  status={status}
                />
              ))}
            </tbody>
          </table>
          {songs.length < totalSongs && (
            <div className="row justify-content-center">
              <div className="col-3">
                <div className={` py-3 ${Styles.viewMore}`}>
                  <p
                    className="font-weight-bold"
                    on
                    onClick={() => setCurrPage(currPage + 1)}
                  >
                    See more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z" />
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongsSection;
