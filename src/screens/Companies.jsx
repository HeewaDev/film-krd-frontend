/* eslint-disable */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../Redux/Actions/company.action";
import DefaultLayout from "../components/DefaultLayout";
import { Card, CardContent, CardMedia, Typography, Grid, CircularProgress, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  // Add your custom theme options here (optional)
});

export default function Companies() {
  const dispatch = useDispatch();
  const { companies, loading } = useSelector(state => state.CompanyReducer);

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  const formatText = (text) => {
    // Split the address by comma and join with newline for better readability
    return text.split(", ").join(",\n");
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <DefaultLayout />
        <h1>I'm company page</h1>
        {loading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {companies.map(company => (
              <Grid item xs={12} sm={6} md={4} key={company.id}>
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', maxWidth: 345 }}>
                  {company.img && company.img[0] && (
                    <CardMedia
                      sx={{ height: 140 }}
                      image={company.img[0]}
                      alt={company.name}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {company.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Type:</strong> {company.type}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      <strong>Address:</strong>
                      <br />
                      {formatText(company.address)}
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
}
