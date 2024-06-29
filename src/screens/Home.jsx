import React, { useState, useEffect } from "react";
import "./home.css"; // Ensure correct CSS import
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { getFilms } from "../Redux/Actions/film.action";
import { Card, Col, Row, Avatar, Button } from "antd";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import SearchComponent from "../components/Search";
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
console.log(films)
  return (
    <DefaultLayout showSearchForm searchTerm={searchTerm} handleSearchChange={handleSearchChange}>
      <div>
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
                xs={24} // Full width on extra small screens
                sm={12} // 2 columns on small screens
                md={8} // 3 columns on medium screens
                lg={6} // 4 columns on large screens
                xl={6} // 4 columns on extra large screens
                key={film.id}
                style={{ marginBottom: "16px" }} // Adjust spacing as per your design
              >
                <Card
                  hoverable
                  cover={<img alt={film.title} src={film.posterimageurl} />}
                >
                  <Meta
                    avatar={<Avatar src={film.posterimageurl} />}
                    title={film.title}
                    description={`Genre: ${film.genre} Duration: ${film.duration} Minutes`}
                   
                  />
                  <div style={{ marginTop: "10px", textAlign: "end" }}>
                    <Button type="primary">
                      <Link to={`/film/${film.id}`}>View Details</Link>
                    </Button>
                  </div>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </div>
    </DefaultLayout>
  );
};

export default Home;
