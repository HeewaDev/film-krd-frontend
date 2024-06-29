import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { CircularProgress, Typography } from "@mui/material";
import { getCastById } from "../Redux/Actions/casts.action";

const Cast = () => {
  const { id } = useParams(); // Fetching id from URL params
  const dispatch = useDispatch();
  const { cast, loading } = useSelector((state) => state.CastsReducer);

  useEffect(() => {
    dispatch(getCastById(id));
  }, [dispatch, id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!cast) {
    return <Typography variant="h5">Cast member not found!</Typography>;
  }

  return (
    <div>
      <DefaultLayout />
      <Typography variant="h3">{cast.name}</Typography>
      <Typography variant="body1"><strong>Role:</strong> {cast.role}</Typography>
      <Typography variant="body1"><strong>Description:</strong> {cast.description}</Typography>
      {/* Add more details as needed */}
    </div>
  );
};

export default Cast;
