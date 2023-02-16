// import styles from "../styles/components/CardDesc.module.scss";
import AdminDashboard from "../../layouts/Dashboard";
import GenreCoverPage from "../../components/Genre/GenreCoverPage";
import SongsSection from "../../components/homepage/SongsSections";
import { notifyError } from "../../utils/alerts";
import { GenreService } from "../../services";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GenrePage = () => {
  const router = useRouter();
  const id = router.query.id;

  const [item, setItem] = useState({ type: "...", songs: 0 });

  const getGenre = () => {
    (async function () {
      try {
        const res = await GenreService.get_by_id(id);
        setItem(res.data);
      } catch (e) {
        notifyError(e.response?.data?.message);
      }
    })();
  };

  useEffect(() => {
    id && getGenre();
  }, [id]);

  // integration for songs list
  const [songs, setSongs] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);

  const fetchSongs = async () => {
    try {
      const res = await GenreService.get_songs_by_id_paginated(id, currPage);
      setSongs([...songs, ...res.data.data]);
      setTotalSongs(res.data.total);
    } catch (e) {
      notifyError(e.response?.data?.message);
    }
  };

  useEffect(() => {
    id && fetchSongs();
  }, [currPage, id]);

  return (
    <AdminDashboard isVerified={false}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <GenreCoverPage
              item={item}
              setItem={setItem}
              songs={songs}
              setSongs={setSongs}
            />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 pt-4">
            <SongsSection
              item={item}
              setSongs={setSongs}
              showTitle={false}
              status={"genre"}
              currPage={currPage}
              totalSongs={totalSongs}
              setCurrPage={setCurrPage}
              songs={songs}
            />
          </div>
        </div>
      </div>
    </AdminDashboard>
  );
};

export default GenrePage;
