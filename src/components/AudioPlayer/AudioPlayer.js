import React, { useState, useRef, useEffect, useContext } from 'react'
import Amplify, { Storage } from 'aws-amplify';
import ReactPlayer from 'react-player';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import "./AudioPlayer.css";
import { IconButton } from '@mui/material';
import { AppContext } from '../../context/AppProvider';
const AudioPlayer = (props) => {
  const [songs, setSongs] = useState([]);
  const [songPlaying, setSongPlaying] = useState('');
  const [audioURL, setAudioURL] = useState('');
  const { selectedMessageId } =useContext(AppContext);
  // const selectedMessageId = props.messages.selectedMessageId;
  console.log("tin nhan",props.messages);
  console.log("id mess", selectedMessageId);
  useEffect(() => {
      fetchSongs();
  }, []);

  const toggleSong = async selectedMessageId => {
      if (songPlaying === selectedMessageId) {
          setSongPlaying('');
          return;
      }

      const songFilePath = props.messages.audio;
      try {
          const fileAccessURL = await Storage.get(songFilePath, { expires: 60 });
          console.log('access url', fileAccessURL);
          setSongPlaying(selectedMessageId);
          setAudioURL(fileAccessURL);
          return;
      } catch (error) {
          console.error('error accessing the file from s3', error);
          setAudioURL('');
          setSongPlaying('');
      }
  };

  const fetchSongs = async () => {
      try {
          // const songData = await API.graphql(graphqlOperation(listSongs));
          const songList = props.messages;
          console.log('song list', songList);
          setSongs(songList);
      } catch (error) {
          console.log('error on fetching songs', error);
      }
  };


  console.log("duong dan",audioURL);
  return (
      <div className="App">
          <div className="songList">
       
                          <div className="songCard">
                              <IconButton  onClick={() => toggleSong(selectedMessageId)}>
                                  {songPlaying === selectedMessageId ? <PauseIcon /> : <PlayArrowIcon />}
                              </IconButton>
                          </div>
                          {songPlaying === selectedMessageId ? (
                              <div className="ourAudioPlayer">
                                  <ReactPlayer
                                      url={audioURL}
                                      controls
                                      playing
                                      height="50px"
                                      onPause={() => toggleSong(selectedMessageId)}
                                  />
                              </div>
                          ) : null}   
          </div>
      </div>
  );
  
}
export { AudioPlayer }

 // <Paper variant="outlined" elevation={2} key={`song${selectedMessageId}`}>
 // </Paper>
