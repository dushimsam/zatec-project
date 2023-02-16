//Import necessarry components
import AlbumsSection from "../components/homepage/AlbumsSection"
import SongsSection from '../components/homepage/SongsSections';
import AdminDashboard from '../layouts/Dashboard';
import GenreSection from '../components/homepage/GenreSection';
import { useEffect, useState } from "react";
import { notifyError } from "../utils/alerts";
import { SongService } from "../services";

const App = () => {
  // Declare state variables for songs, current page, and total number of songs
  const [songs, setSongs] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [totalSongs, setTotalSongs] = useState(0);

  // Declare a function to fetch a paginated list of songs and update the state variables
  const fetchSongs = async () => {
      try {
          const res = await SongService.get_all_paginated(currPage);
          // Append new songs to the existing list of songs
          setSongs([...songs, ...res.data.data]);
          setTotalSongs(res.data.total);
      } catch (e) {
          // If there is an error, display a notification with the error message
          notifyError(e.response?.data?.message);
      }
  };

  // Call the fetchSongs function whenever the current page changes
  useEffect(() => {
      fetchSongs();
  }, [currPage]);

  // Render an admin dashboard with several sections for managing songs and albums
  return (
      <AdminDashboard isVerified={false}>
          <div className='container'>
              <div className='row justify-content-center pt-2' id={"album"}>
                  <div className='col-12'>
                      <AlbumsSection/>
                  </div>
              </div>

              <div className='row justify-content-center pt-5' id={"genre"}>
                  <div className='col-12'>
                      <GenreSection/>
                  </div>
              </div>

              <div className='row justify-content-center pt-5' id={"featured"}>
                  <div className='col-12'>
                      {/* Render a section for displaying a paginated list of songs */}
                      <SongsSection
                          status={`all`}
                          currPage={currPage}
                          showTitle={true}
                          totalSongs={totalSongs}
                          setCurrPage={setCurrPage}
                          songs={songs}
                          setSongs={setSongs}
                      />
                  </div>
              </div>
          </div>
      </AdminDashboard>
  );
};

export default App;