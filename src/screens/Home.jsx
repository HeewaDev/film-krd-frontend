import React, { useState, useEffect } from "react";
import "./home.css";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getFilms } from "../Redux/Actions/film.action";
import { Card, Col, Row, Avatar } from "antd";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import SearchComponent from "../components/Search";
import ColorSchemesExample from "../components/DefaultLayout";
import ResponsiveAppBar from "../components/DefaultLayout";
const { Meta } = Card;

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { films, loading } = useSelector((state) => state.FilmsReducer);

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredFilms = films
    .filter((film) =>
      film.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 8); // Limit to 8 films

  return (
  
      <div>
        <ResponsiveAppBar />
        <SearchComponent />
        <Row
          justify="center"
          gutter={[16, 16]} // Adjust gutter as per your design
          className="mt-5"
          style={{ padding: "0 16px" }} // Adjust padding as per your design
        >
          {loading ? (
            <Spinner />
          ) : (
            filteredFilms.map((film) => (
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
                      <a href={`/films/${film.id}`}><span>View Details</span></a>
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

export default Home;
