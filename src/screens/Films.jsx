import { useDispatch, useSelector } from "react-redux";

import { Card,  } from "@mui/material";
import { getFilms } from "../Redux/Actions/film.action";
import "./films.css"; // Import the CSS file (optional)
import  { useState, useEffect } from "react";
import {  Col, Row, Avatar, Select, Input } from "antd";

import Spinner from "../components/Spinner";
import ResponsiveAppBar from "../components/DefaultLayout";
const { Meta } = Card;
// const theme = createTheme({
//   // Add your custom theme options here (optional)
// });




const Films = () => {
  // const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("release_date"); // Default sort option
  const dispatch = useDispatch();
  const { films, loading } = useSelector((state) => state.FilmsReducer);

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  // const handleFilmClick = (id) => {
  //   navigate(`/films/${id}`); // Navigate to Film component with the film ID
  // };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const sortedFilms = films
    .filter((film) =>
      film.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "release_date") {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "length") {
        return a.duration - b.duration;
      }
      return 0;
    });

  return (
    <div>
      <ResponsiveAppBar />
      <div className="search-sort-bar">
        <Input
          placeholder="Search films"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: "16px", width: "300px" }}
        />
        <Select
          defaultValue="release_date"
          value={sortOption}
          onChange={handleSortChange}
          style={{ width: "200px" }}
          options={[
            {
              value: "release_date",
              label: "Sort by Release Date",
            },
            {
              value: "title",
              label: "Sort by Title",
            },
            {
              value: "length",
              label: "Sort by Length",
            
            }
          ]}
      />
      
      </div>
      <Row
        justify="center"
        gutter={[16, 16]}
        className="mt-5"
        style={{ padding: "0 16px" }}
      >
        {loading ? (
          <Spinner />
        ) : (
          sortedFilms?.map((film) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              key={film.id}
              style={{ marginBottom: "16px" }}
            >
              <Card
                hoverable
                className="card-container"
                cover={
                  <div className="card-cover">
                    <img alt={film.title} src={film.posterimageurl} />
                  </div>
                }
              >
                <Meta
                  className="card-meta"
                  avatar={<Avatar src={film.posterimageurl} />}
                  title={film.title}
                  description={`Genre: ${film.genre} Duration: ${film.duration} Minutes`}
                />
                <div className="card-actions">
                  <button className="btn">
                    <a href={`/films/${film.id}`}>
                      <span>View Details</span>
                    </a>
                  </button>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Films;
