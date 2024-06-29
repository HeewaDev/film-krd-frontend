import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getFilms } from "../Redux/Actions/film.action";
import "./films.css"; // Import the CSS file (optional)

const theme = createTheme({
  // Add your custom theme options here (optional)
});

const Films = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { films, loading } = useSelector((state) => state.FilmsReducer);

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  const handleFilmClick = (id) => {
    navigate(`/films/${id}`); // Navigate to Film component with the film ID
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <DefaultLayout />
        <h1>I'm Films page</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {films.map((film) => (
              <Grid item xs={12} sm={6} md={4} key={film.id} onClick={() => handleFilmClick(film.id)}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', maxWidth: 345 }}>
                  {film.posterimageurl && (
                    <CardMedia
                      sx={{ height: 140 }}
                      image={film.posterimageurl}
                      alt={film.title}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {film.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Genre:</strong> {film.genre.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Duration:</strong> {film.duration} minutes
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Films;