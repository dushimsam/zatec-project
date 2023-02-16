// Import React hooks and components
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminDashboard from "../../layouts/Dashboard";
import SongsSection from "../../components/homepage/SongsSections";
import AlbumCoverPage from "../../components/Album/AlbumCoverPage";
import { AlbumService } from "../../services";
import { notifyError } from "../../utils/alerts";

const AlbumPage = () => {
  // Get the album ID from the router
  const router = useRouter();
  const id = router.query.id;

  // Initialize state variables for the album and its songs
  const [item, setItem] = useState({ type: "...", songs: 0 });
  const [songs, setSongs] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);

  // Define a function to fetch the album by ID
  const getAlbum = () => {
    (async function () {
      try {
        // Call the AlbumService API to get the album data
        const res = await AlbumService.get_by_id(id);
        // Update the state variable for the album
        setItem(res.data);
      } catch (e) {
        // Handle errors by showing an error message
        // notifyError(e.response?.data?.message);
      }
    })();
  };

  // Call getAlbum() when the ID changes
  useEffect(() => {
    id && getAlbum();
  }, [id]);

  //A function to fetch the album's songs by page number
  const fetchSongs = async () => {
    try {
      // Call the AlbumService API to get the songs data
      const res = await AlbumService.get_songs_by_id_paginated(id, currPage);
      // Update the state variables for the songs and the total number of songs
      setSongs([...songs, ...res.data.data]);
      console.log("songs",res.data.data);
      setTotalSongs(res.data.total);
    } catch (e) {
      // Handle errors by showing an error message
      // notifyError(e.response?.data?.message);
    }
  };

  // Call fetchSongs() when the current page or ID changes
  useEffect(() => {
    id && fetchSongs();
  }, [currPage, id]);

  // Render the album page with the album cover and songs section
  return (
    <AdminDashboard isVerified={false}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <AlbumCoverPage item={item} setItem={setItem} setSongs={setSongs} songs={songs} />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-10 pt-4">
            <SongsSection
              item={item}
              showTitle={false}
              setSongs={setSongs}
              currPage={currPage}
              status={"album"}
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

export default AlbumPage;
