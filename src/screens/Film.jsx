import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { CircularProgress, Typography, Box } from "@mui/material";
import { getFilmById, getCastsByFilmId } from "../Redux/Actions/film.action";
import { getCastById } from "../Redux/Actions/casts.action";

import "./film.css";

const Film = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { film, casts, loading } = useSelector((state) => state.FilmsReducer);

  useEffect(() => {
    dispatch(getFilmById(id));
    dispatch(getCastsByFilmId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (casts && casts.length > 0) {
      casts.forEach((cast) => {
        dispatch(getCastById(cast.casts_id));
      });
    }
  }, [casts, dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!film) {
    return <Typography variant="h5">Film not found!</Typography>;
  }

  const getEmbedUrl = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  const embedUrl = getEmbedUrl(film.trailerurl);

  return (
    <Box className="film-container">
      <Box
        className="film-background"
        sx={{
          backgroundImage: `url(${film.wallpaper})`,
        }}
      />
      <DefaultLayout />
      <Box className="film-grid">
        <Box className="film-details">
          <Typography variant="h3" className="film-title">
            {film.title}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Genre:   </strong> {film.genre}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Duration:</strong> {film.duration} minutes
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Keywords:</strong> {film.keywords}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Synopsis:</strong> {film.synopsis}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Language:</strong> {film.language}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Country:</strong> {film.country}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Release Date:</strong>{" "}
            {new Date(film.release_date).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Budget:</strong> {film.budget}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Box Office:</strong> {film.boxoffice}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Film Type:</strong> {film.filmtype}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Awards:</strong> {film.awards}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Nominations:</strong> {film.nominations}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Title (Kurdish):</strong> {film.titlekurdish}
          </Typography>
          <Typography variant="body1" className="film-detail">
            <strong>Synopsis (Kurdish):</strong> {film.synopsiskurdish}
          </Typography>
        </Box>
        <Box className="film-casts">
          <Typography variant="h4" className="film-casts-title">
            Casts
          </Typography>
          <Box className="film-casts-grid">
            {casts?.length === 0 ? (
              <Typography variant="body1">No casts found for this film.</Typography>
            ) : (
              casts?.map((cast, index) => (
                <Box className="film-cast" key={cast.casts_id}>
                  {/* Assuming cast details are available in Redux state */}
                  {cast.name && (
                    <>
                      <img
                        className="cast-image"
                        src={cast.img} // Ensure img is fetched from Redux state
                        alt={cast.name}
                      />
                      <Typography variant="body1" className="cast-name">
                        {cast.name}
                      </Typography>
                    </>
                  )}
                  <Typography variant="body1" className="cast-role">
                    {cast.role}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
        <Box className="film-poster-container">
          <img
            className="film-poster"
            src={film.posterimageurl}
            alt={film.title}
          />
          <Box className="film-trailer-container">
            <iframe className="film-trailer" src={embedUrl} title="Film Trailer" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Film;
