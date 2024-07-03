import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import { CircularProgress, Typography, Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Leaflet styles
import L from "leaflet";
import { getShootingLocationById } from "../Redux/Actions/shootingLocations.actions";
import "./shootingLocation.css";

// Fix default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ShootingLocation = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { location, loading } = useSelector((state) => state.ShootingLocationsReducer);

  useEffect(() => {
    dispatch(getShootingLocationById(id));
  }, [dispatch, id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!location) {
    return <Typography variant="h5">Shooting location not found!</Typography>;
  }

  // Function to transform YouTube URL to embeddable format
  const getEmbeddableUrl = (url) => {
    const youtubeMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }
    return url; // Return original URL if not YouTube
  };

  // Function to parse coordinates safely
  const parseCoordinates = (locationString) => {
    if (!locationString) return [0, 0];
    const parts = locationString.split(",");
    if (parts.length !== 2) return [0, 0];
    const [lat, lng] = parts.map(coord => parseFloat(coord.trim()));
    return [isNaN(lat) ? 0 : lat, isNaN(lng) ? 0 : lng];
  };

  const coordinates = parseCoordinates(location.location);

  return (
    <Box className="location-container">
      <Box className="location-background"
        sx={{
          backgroundImage: `url(${location.wallpaper})`,
        }}
      />

      <DefaultLayout />
      <Box className="location-grid">
        <Box className="location-details">
          <Typography variant="h3" className="location-name">
            {location.name}
          </Typography>
          <Typography variant="body1" className="location-detail">
            <strong>City:</strong> {location.city}
          </Typography>
          <Typography variant="body1" className="location-detail">
            <strong>Country:</strong> {location.country}
          </Typography>
          <Typography variant="body1" className="location-detail">
            <strong>Description:</strong> {location.description}
          </Typography>
          <Typography variant="body1" className="location-detail">
            <strong>Coordinates:</strong> {location.location}
          </Typography>
        </Box>
        <Box className="location-media-container">
          {location.img && location.img.length > 0 && location.img.map((imageUrl, index) => (
            <img
              key={index}
              className="location-image"
              src={imageUrl}
              alt={`${location.name}-${index}`}
            />
          ))}
          {location.trailerurl && (
            <iframe
              className="location-trailer"
              src={getEmbeddableUrl(location.trailerurl)}
              title="Location Trailer"
              allowFullScreen
            />
          )}
        </Box>
        <Box className="location-map-container">
          {coordinates[0] !== 0 && coordinates[1] !== 0 && (
            <MapContainer center={coordinates} zoom={13} scrollWheelZoom={false} className="location-map">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={coordinates}>
                <Popup>{location.name}</Popup>
              </Marker>
            </MapContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ShootingLocation;
