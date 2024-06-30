/* eslint-disable */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCasts } from "../Redux/Actions/casts.action";
import DefaultLayout from "../components/DefaultLayout";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom for navigation

const Casts = () => {
  const dispatch = useDispatch();
  const { casts, loading } = useSelector(state => state.CastsReducer);

  useEffect(() => {
    dispatch(GetCasts());
  }, [dispatch]);

  return (
    <div>
      <DefaultLayout />
      <h1>Cast Page</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {casts?.map(cast => (
            <Grid item xs={12} sm={6} md={4} key={cast.id}>
              <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                maxWidth: 345,
              }}>
                {cast.img.length > 0 && (
                  <CardMedia
                    sx={{ height: 140 }}
                    image={cast.img[0]}
                    alt={cast.name}
                  />
                )}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    <Link to={`/casts/${cast.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      {cast.name}
                    </Link>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Role:</strong> {cast.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    <strong>Description:</strong> {cast.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default Casts;
