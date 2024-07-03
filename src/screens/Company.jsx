import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { CircularProgress, Typography, Box } from "@mui/material";
import { getCompanyById } from "../Redux/Actions/company.action";
import "./company.css";

const Company = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { company, loading } = useSelector((state) => state.CompaniesReducer);

  useEffect(() => {
    dispatch(getCompanyById(id));
  }, [dispatch, id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!company) {
    return <Typography variant="h5">Company not found!</Typography>;
  }

  return (
    <Box className="company-container">
      <Box className="company-background"
        sx={{
          backgroundImage: `url(${company.wallpaper})`,
        }}
      />

      <DefaultLayout />
      <Box className="company-grid">
        <Box className="company-details">
          <Typography variant="h3" className="company-name">
            {company.name}
          </Typography>
          <Typography variant="body1" className="company-detail">
            <strong>Type:</strong> {company.type}
          </Typography>
          <Typography variant="body1" className="company-detail">
            <strong>Location:</strong> {company.address}
          </Typography>
          <Typography variant="body1" className="company-detail">
            <strong>Founded:</strong> {new Date(company.founded).toLocaleDateString()}
          </Typography>
         
          <Typography variant="body1" className="company-detail">
            <strong>Summary:</strong> {company.description}
          </Typography>
          <Typography variant="body1" className="company-detail">
            <strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
          </Typography>
          <Typography variant="body1" className="company-detail">
            <strong>Phone:</strong> {company.phone}
          </Typography>
        </Box>
        <Box className="company-logo-container">
          <img
            className="company-logo"
            src={company.img}
            alt={company.name}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Company;
