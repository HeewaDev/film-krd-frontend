// src/components/MovieCard.jsx
/* eslint-disable */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: '1rem',
  },
  media: {
    height: 400,
  },
});

const MovieCard = ({ title, genres, duration, imageUrl }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imageUrl}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Genres: </strong> {genres.join(', ')}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Duration: </strong> {duration} minutes
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
