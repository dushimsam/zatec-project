// Import React hooks and components
import Styles from "../../styles/components/GenreCard.module.scss";
import Popup from "reactjs-popup";
import ModalWrapper from "../../components/Reusable/modals/ModalWrapper";
import GenreFormInput from "../forms/CreateGenre";
import { useEffect, useState } from "react";
import { GenreService } from "../../services";
import { notifyError, notifySuccess } from "../../utils/alerts";
import Router from "next/router";

// Functional Component to display genres with create genre form
const GenreSection = () => {
  // Set initial states for form inputs, form validation, loading state list of genres
  const [values, setValues] = useState({
    type: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalGenres, setTotalGenres] = useState(0);
  const [genres, setGenres] = useState([
    {
      id: "new",
      type: "",
      created_at: "",
      updated_at: "",
    },
  ]);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Async function to create new genre
  const Create = async () => {
    try {
      setLoading(true);
      // Create new genre and get response
      const res = await GenreService.create(values);

      // Notify success and add new album to list
      notifySuccess(res.data.message);
      setGenres([...genres, res.data.model]);
    } catch (e) {
      notifyError(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  // Async function to fetch list of albums based on current page number
  const fetchGenres = async () => {
    try {
      const res = await GenreService.get_all_paginated(currPage);
      setTotalGenres(res.data.total);
      setGenres([...genres, ...res.data.data]);
    } catch (e) {
      notifyError(e.response?.data?.message);
    }
  };

   // Use effect hook to fetch list of albums on component mount or when current page changes
  useEffect(() => {
    fetchGenres();
  }, [currPage]);

  // Return JSX with genre list and form inputs for creating new genre
  return (
    <div className="container">
      <div className="row justify-content-start">
        <div className="col-4">
          <h3>Genres</h3>
        </div>
      </div>
      <div className="row justify-content-start">
        {genres.map((card, index) =>
          card.id == "new" ? (
            <div className="col-3">
              <Popup
                trigger={
                  <div className={`${Styles.newGenreCard}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z" />
                      <path
                        d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                        fill="rgba(149,164,166,1)"
                      />
                    </svg>
                  </div>
                }
                modal
                nested
              >
                {(close) => (
                  <ModalWrapper
                    title={"Add New Genre"}
                    loading={loading}
                    close={close}
                    disable={isFormValid}
                    callFun={Create}
                    btnActionText={"CREATE"}
                    content={
                      <GenreFormInput
                        setIsFormValid={setIsFormValid}
                        setValues={setValues}
                        values={values}
                      />
                    }
                  />
                )}
              </Popup>
            </div>
          ) : (
            <div className="col-md-4 col-6 my-2" key={index}>
              <div className={`${Styles.card} py-2`}>
                <span className="mr-md-5">{card.type}</span>
                <button
                  className={`btn p-md-3 ml-2  ${Styles.cardBtn}`}
                  onClick={() => Router.push("genre/" + card.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                      fill="rgba(255,255,255,1)"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )
        )}
      </div>
      {genres.length < totalGenres && (
        <div className="row justify-content-center">
          <div className="col-3">
            <div className={` py-3 ${Styles.viewMore}`}>
              <p
                className="font-weight-bold"
                on
                onClick={() => setCurrPage(currPage + 1)}
              >
                View more
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
  );
};

export default GenreSection;
