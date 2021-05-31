import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import './Details.css';

const Details = (props) => {
  const datamovies = null;
  let movieID = props.match.params.id;
  const [posterUrl, setPosterUrl] = useState('');
  const [title, setTitle] = useState('');
  const [genres, setGenres] = useState([]);
  const [duration, setDuration] = useState('');
  const [releasedate, setReleaseDate] = useState('');
  const [criticsrating, setCriticsRating] = useState('');
  const [storyline, setStoryLine] = useState('');
  const [wikiUrl, setWikiUrl] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [artists, setArtist] = useState([]);
  const [classnametochangecolor1, setClassname1] = useState('beforeclickingstarborder1');
  const [classnametochangecolor2, setClassname2] = useState('beforeclickingstarborder2');
  const [classnametochangecolor3, setClassname3] = useState('beforeclickingstarborder3');
  const [classnametochangecolor4, setClassname4] = useState('beforeclickingstarborder4');
  const [classnametochangecolor5, setClassname5] = useState('beforeclickingstarborder5');

  useEffect(() => {
    fetch(props.baseUrl + "movies/" + movieID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        id: movieID
      },
      body: datamovies,
    })
      .then((response) => response.json())
      .then((response) => {
        setPosterUrl(response.poster_url);
        setTitle(response.title);
        setGenres(response.genres);
        setDuration(response.duration);
        dateformatting(response);
        setCriticsRating(response.rating);
        setStoryLine(response.storyline);
        setWikiUrl(response.wiki_url);
        setTrailerUrl(response.trailer_url.slice(32));
        setArtist(response.artists);
      });

    const dateformatting = (response) => {
      let dateString = response.release_date;
      let dateObject = new Date(dateString);
      setReleaseDate(dateObject.toDateString());
    }
  }, [])

  //To handle backbutton funtionality
  const handleclickback = () => {
    window.location.href = '/';
  }

  //To set states of the five stars used for rating
  const settingcolor1 = () => {
    if (classnametochangecolor1 === 'beforeclickingstarborder1') {
      setClassname1('starborder1');
    }
    if (classnametochangecolor1 === 'starborder1') {
      setClassname1('beforeclickingstarborder1');
    }
  }

  const settingcolor2 = () => {
    if (classnametochangecolor2 === 'beforeclickingstarborder2') {
      setClassname2('starborder2');
    }
    if (classnametochangecolor2 === 'starborder2') {
      setClassname2('beforeclickingstarborder2');
    }
  }
  const settingcolor3 = () => {
    if (classnametochangecolor3 === 'beforeclickingstarborder3') {
      setClassname3('starborder3');
    }
    if (classnametochangecolor3 === 'starborder3') {
      setClassname3('beforeclickingstarborder3');
    }
  }
  const settingcolor4 = () => {
    if (classnametochangecolor4 === 'beforeclickingstarborder4') {
      setClassname4('starborder4');
    }
    if (classnametochangecolor4 === 'starborder4') {
      setClassname4('beforeclickingstarborder4');
    }
  }
  const settingcolor5 = () => {
    if (classnametochangecolor5 === 'beforeclickingstarborder5') {
      setClassname5('starborder5');
    }
    if (classnametochangecolor5 === 'starborder5') {
      setClassname5('beforeclickingstarborder5');
    }
  }


  return (
    <div>
      <Header propsdata={props}></Header>
      <div>
        <Typography variant="subtitle1" className='backbutton' onClick={() => handleclickback()}>
          <KeyboardArrowLeftIcon className="backbuttonicons"></KeyboardArrowLeftIcon>Back to home
        </Typography><br />
      </div>

      <div className="container">
        <div className="item1">
          <img src={posterUrl} alt='poster-img' />
        </div>
        <div className="item2">
          <Typography variant="headline" component="h2" className='heading'>{title}</Typography>
          <Typography variant="caption" style={{ fontWeight: "bold" }}>Genre: <span style={{ fontWeight: "normal" }}>{genres !== null && genres.length && genres.map((genre, index) => <span key={index}>{genre} </span>)}</span></Typography>
          <Typography variant="caption" style={{ fontWeight: "bold" }}>Duration: <span style={{ fontWeight: "normal" }}>{duration}</span></Typography>
          <Typography variant="caption" style={{ fontWeight: "bold" }}>Release Date: <span style={{ fontWeight: "normal" }}>{releasedate}</span></Typography>
          <Typography variant="caption" style={{ fontWeight: "bold" }}>Rating: <span style={{ fontWeight: "normal" }}>{criticsrating}</span></Typography><br />
          <Typography variant="caption" style={{ fontWeight: "bold" }}>Plot: <span style={{ fontWeight: "normal" }}>(<a href={wikiUrl}>Wiki Link</a>) {storyline}</span></Typography><br />
          <Typography variant="caption" style={{ fontWeight: "bold" }}>Trailer:<YouTube videoId={trailerUrl} className="trailervideo" /></Typography><br />
        </div>
        <div className="item3">
          <Typography variant="caption" style={{ fontWeight: "bold" }}>Rate this movie:</Typography>
          <StarBorderIcon className={classnametochangecolor1} onClick={() => settingcolor1()}></StarBorderIcon>
          <StarBorderIcon className={classnametochangecolor2} onClick={() => settingcolor2()}></StarBorderIcon>
          <StarBorderIcon className={classnametochangecolor3} onClick={() => settingcolor3()}></StarBorderIcon>
          <StarBorderIcon className={classnametochangecolor4} onClick={() => settingcolor4()}></StarBorderIcon>
          <StarBorderIcon className={classnametochangecolor5} onClick={() => settingcolor5()}></StarBorderIcon><br /><br />
          <Typography variant="caption" style={{ fontWeight: "bold" }}>Artists:</Typography><br />
          <div className='gridcontainer'>
            <GridList className='gridlist' cols={2}>
              {artists !== null && artists.length && artists.map((artist) => (
                <GridListTile key={artist.id} className='gridlisttile'>
                  <img src={artist.profile_url} alt="artist-img" className='imgclass' />
                  <GridListTileBar className='title'
                    title={artist.first_name + " " + artist.last_name}
                    actionIcon={
                      <IconButton className='icon'></IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Details;