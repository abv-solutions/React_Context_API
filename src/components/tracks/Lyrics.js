import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../layout/Spinner';

const Lyrics = props => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});
  // Get track lyrics and info when page loads
  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_LYRIC_KEY}`
      )
      .then(res => {
        let lyrics = res.data.message.body.lyrics;
        setLyrics({ lyrics });
        // Make second api call
        return axios.get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_LYRIC_KEY}`
        );
      })
      // Get result of second api call
      .then(res => {
        let track = res.data.message.body.track;
        setTrack({ track });
      })
      .catch(err => console.log(err));
  }, [props.match.params.id]);

  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <>
        <h3 className='text-center mb-4'>Track lyrics</h3>
        <Link to='/' className='btn btn-dark mb-4'>
          Back
        </Link>

        <div className='card shadow'>
          <h5 className='card-header'>
            {track.track.track_name} by
            <span className='text-secondary'> {track.track.artist_name}</span>
          </h5>
          <div className='card-body'>
            {lyrics.lyrics.lyrics_body.split('\n').map(lyric => (
              <p
                key={Math.random()
                  .toString()
                  .substr(2, 7)}
                className='card-text'
              >
                {lyric}
              </p>
            ))}
          </div>
        </div>

        <ul className='list-group shadow my-4'>
          <li className='list-group-item'>
            <strong>Song Genre: </strong>
            {track.track.primary_genres.music_genre_list.length === 0 ||
            track.track.primary_genres.music_genre_list === undefined
              ? 'No genre available'
              : // Map through genre list
                track.track.primary_genres.music_genre_list.map(
                  (genre, i, list) =>
                    // If last item, don't add comma
                    list.length === i + 1
                      ? `${genre.music_genre.music_genre_name}`
                      : `${genre.music_genre.music_genre_name}, `
                )}
          </li>
          <li className='list-group-item'>
            <strong>Explicit Words: </strong>
            {track.track.explicit === 0 ? 'No' : 'Yes'}
          </li>
          <li className='list-group-item'>
            <strong>Update Date: </strong>
            {track.track.updated_time.substring(0, 10)}
          </li>
        </ul>
      </>
    );
  }
};

export default Lyrics;
