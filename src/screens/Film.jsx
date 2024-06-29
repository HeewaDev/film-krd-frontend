import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { CircularProgress, Typography } from "@mui/material";
import { getFilmById, getCastsByFilmId } from "../Redux/Actions/film.action";

const Film = () => {
  const { id } = useParams(); // Fetching id from URL params
  const dispatch = useDispatch();
  const { film, loading: filmLoading } = useSelector((state) => state.FilmsReducer);
  const { casts, loading: castsLoading } = useSelector((state) => state.FilmsReducer);

  useEffect(() => {
    dispatch(getFilmById(id));
    
  }, [dispatch, id]);

  useEffect(() => {
    
    dispatch(getCastsByFilmId(id));
  }, [dispatch, id]);

  if (filmLoading || castsLoading) {
    return <CircularProgress />;
  }

  if (!film) {
    return <Typography variant="h5">Film not found!</Typography>;
  }

  return (
    <div>
      <DefaultLayout />
      <Typography variant="h3">{film.title}</Typography>
      <Typography variant="body1"><strong>Genre:</strong> {film.genre.join(', ')}</Typography>
      <Typography variant="body1"><strong>Duration:</strong> {film.duration} minutes</Typography>
      {/* Add more details as needed */}
      <Typography variant="h4">Casts</Typography>
      {casts.length === 0 ? (
        <Typography variant="body1">No casts found for this film.</Typography>
      ) : (
        <ul>
          console.log()
          {casts.map((cast) => (
            <li key={cast.role}>
              <Typography variant="body1"><strong>{cast.role}</strong></Typography>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Film;
