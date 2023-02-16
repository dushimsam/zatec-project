import Styles from "../../styles/components/Forms.module.scss";
import SelectControl from "../../components/widgets/SelectControl";
import { useEffect, useState } from "react";
import InputControl from "../Reusable/InputControl";
import { isThisFormValid } from "../../utils/functions";
import { notifyError, notifySuccess } from "../../utils/alerts";
import { AlbumService, GenreService } from "../../services";

const SongFormInput = ({
  setIsFormValid,
  setValues,
  status,
  values,
  addTo,
}) => {
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchAlbums = async () => {
    try {
      const res = await AlbumService.get_all();
      setAlbums(res.data);
    } catch (e) {
      notifyError(e.response?.data?.message);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await GenreService.get_all();
      setGenres(res.data);
    } catch (e) {
      notifyError(e.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchAlbums();
    fetchGenres();
  }, []);

  const [valid, setValid] = useState({
    title: !!status,
    length: true,
    album_id: addTo === "genre" ? !!status : 1,
    genre_id: addTo === "album" ? !!status : 1,
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
      <div className="row justify-content-center">
        <div className="col-11 mt-2">
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
              type="number"
              validations="required|integer|min:1"
              handleChangeV2={handleChangeV2("length")}
              value={values.length}
              label="Length"
              min={1}
            />
          </div>

          {addTo === "genre" || addTo === "all" ? (
            <div className="form-group">
              <SelectControl
                label="Album"
                handleChangeV2={handleChangeV2("album_id")}
                value={values.album_id}
              >
                <option value="">Select Album</option>
                {albums.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.title}
                  </option>
                ))}
              </SelectControl>
            </div>
          ) : (
            <></>
          )}

          {addTo === "album" || addTo === "all" ? (
            <div className="form-group">
              <SelectControl
                label="Genre"
                handleChangeV2={handleChangeV2("genre_id")}
                value={values.genre_id}
              >
                <option value="">Select Genre</option>
                {genres.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.type}
                  </option>
                ))}
              </SelectControl>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SongFormInput;
