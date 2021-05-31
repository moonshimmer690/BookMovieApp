import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";
import './Home.css';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from "@material-ui/core/MenuItem";


const Home = (props) => {

  let datamovies = null;
  const [moviename, setMovieName] = useState('');
  const [genre, setGenre] = useState([]);
  const [releasestartdate, setReleaseStartDate] = useState('');
  const [releaseenddate, setReleaseEndDate] = useState('');
  const [artist, setArtist] = useState([]);
  const [tileData, settileData] = useState([]);
  const [checkboxChecked, setCheckbox] = useState(false);
  const [render,setrender] = useState(false);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#ADD8E6'
      }
    }
  });

  useEffect(() => {
    settingmoviedata();
    settinggenres();
    settingartists();
  }, []);

  const settingmoviedata = () => {
    fetch(props.baseUrl + "movies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: datamovies,
    })
      .then((response) => response.json())
      .then((response) => {
        for (let data of response.movies) {
          tileData.push(data);
          settileData(tileData);
        }
      });
  }


  const settinggenres = () => {
    fetch(props.baseUrl + "genres/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: datamovies,
    })
      .then((response) => response.json())
      .then((response) => {
        for (let data of response.genres) {
          genre.push(data);
          setGenre(genre);
        }
      });
  }

  const settingartists = () => {
    fetch(props.baseUrl + "artists/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: datamovies,
    })
      .then((response) => response.json())
      .then((response) => {
        for (let data of response.artists) {
          artist.push(data);
          setArtist(artist);
        }
      });
  }

  const artistChangeHandler = (e) => {
    const val = e.target.value;
    artist.push(val);
    setArtist(artist);
  }

  const genreChangeHandler = (e) => {
    genre.push(e.target.value);
    setGenre(genre);
  }

  const handlerender = (id) => {
    window.location.href = "/movie/id/"+id;
  }

  const onApplyFilters = () => {

    settileData([]);

    fetch(props.baseUrl + "movies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
      },
      body: datamovies,
    })
      .then((response) => response.json())
      .then((response) => {
        settingsearchedmoviedata(response);
      });

  }

  const settingsearchedmoviedata = (response) => {
    for (let data of response.movies) {
      tileData.push(data);
      tileData.map((tile) => {
        if (moviename !== null && tile.title === moviename) {
          settileData(tileData);
        }

        if ((genre !== null && (JSON.stringify(genre) === JSON.stringify(tile.genre)))) {
          settileData(tileData);
        }
        
      });
    }

    settileData(tileData);
  }

  return (
    <div>
      <Header propsdata={props}></Header>


      <div className='upcomingmovies'>Upcoming Movies</div>


      <div className='gridcontainer'>
        <GridList className='gridlist' cols={6} cellHeight={250} style={{ margin: 0, width: '100%'}}>
          {tileData.length && tileData.map((tile) => (
            <GridListTile key={tile.id} className='gridlisttile' tileheight={250} onClick={() => handlerender(tile.id)}>
              <img src={tile.poster_url} alt={tile.title} className='imgclass' />
              <GridListTileBar className='title'
                title={tile.title}
                actionIcon={
                  <IconButton className='icon'></IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        
      </div>


      <div className="flex-container">

        <div className="firsthalf gridcontainer">
          <div className='gridcontainersecondhalf'>
            <GridList className='gridlist' cols={4} cellHeight={350}>
              {tileData.map((tile) => (
                <GridListTile key={tile.id} className='gridlisttile' tileheight={550} style={{ width: "auto", margin: "16px" }} onClick={() => handlerender(tile.id)}>
                  <img src={tile.poster_url} alt={tile.title} className='imgclass' />
                  <GridListTileBar className='title' style={{ width: "auto" }}
                    title={tile.title}
                    subtitle={<span>Release Date: {tile.release_date}</span>}
                    actionIcon={
                      <IconButton className='icon'></IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>

        <div className="secondhalf">
          <div className='cardcontainer'>
            <Card>
              <CardContent className='cardroot'>
                <h4 style={{ color: theme.palette.primary.light, margin: theme.spacing.unit }}>FIND MOVIES BY:</h4>
                <FormControl className="formControl" style={{ margin: theme.spacing.unit }}>
                  <TextField
                    value={moviename}
                    onInput={(e) => setMovieName(e.target.value)}
                    fullWidth
                    id="moviename"
                    label="Movie Name"
                    name="moviename"
                    autoComplete="moviename"

                  />
                </FormControl>
                <br />
                <FormControl className="formControl" style={{ margin: theme.spacing.unit }}>
                  <InputLabel htmlFor="genre">Genre</InputLabel>
                  <Select value={genre}>
                    {genre.map((gen) => (
                      <MenuItem key={gen.id} value={gen.genre}>
                        <Checkbox checked={checkboxChecked} value={gen.genre} onChange={(e) => genreChangeHandler(e)} />
                        {gen.genre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />
                <FormControl className="formControl" style={{ margin: theme.spacing.unit }}>
                  <InputLabel htmlFor="artist">Artist</InputLabel>
                  <Select value={artist}>
                    {artist.map((art) => (
                      <MenuItem key={art.id} value={art.first_name + " " + art.last_name}>
                        <Checkbox checked={checkboxChecked} value={art.first_name + " " + art.last_name} onChange={e => artistChangeHandler(e)} />
                        {art.first_name + " " + art.last_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <br />

                <br />
                <FormControl className="formControl" style={{ margin: theme.spacing.unit }}>
                  <TextField
                    onInput={(e) => setReleaseStartDate(e.target.value)}
                    fullWidth
                    id="releasestartdate"
                    label="Release Date Start"
                    name="releasestartdate"
                    defaultValue="dd-mm-yyyy"
                    type="date"
                    autoComplete="releasestartdate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
                <br />
                <FormControl className="formControl" style={{ margin: theme.spacing.unit }}>
                  <TextField
                    onInput={(e) => setReleaseEndDate(e.target.value)}
                    fullWidth
                    id="releaseenddate"
                    label="Release Date End"
                    name="releaseenddate"
                    defaultValue="dd-mm-yyyy"
                    type="date"
                    autoComplete="releasenddate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => onApplyFilters()}
                >
                  Apply
               </Button>
              </CardActions>
            </Card>
          </div>
        </div>


      </div>

    </div>
  )
};

export default Home;