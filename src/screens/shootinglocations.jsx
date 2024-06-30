import React, { useState, useEffect } from 'react';
import './films.css'; // Ensure this path is correct
import { useDispatch, useSelector } from 'react-redux';
import { getShootingLocations } from '../Redux/Actions/shootingLocations.actions.jsx'; // Adjust the action import based on your setup
import { Card, Col, Row, Avatar, Input, Select } from 'antd';
import Spinner from '../components/Spinner';
import ResponsiveAppBar from "../components/DefaultLayout";

const { Meta } = Card;
const { Option } = Select;

const ShootingLocations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name'); // Default sort option
  const dispatch = useDispatch();
  const { shootingLocations, loading } = useSelector((state) => state.ShootingLocationsReducer); // Adjust according to your Redux state structure

  useEffect(() => {
    dispatch(getShootingLocations()); // Dispatch action to fetch shooting locations
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const sortedLocations = shootingLocations
    .filter((location) =>
      location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      location.city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'city') {
        return a.city.localeCompare(b.city);
      }
      return 0;
    });

  return (
    <div>
      <ResponsiveAppBar />
      <div className="search-sort-bar">
        <Input
          placeholder="Search locations"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: '16px', width: '300px' }}
        />
        <Select
          defaultValue="name"
          value={sortOption}
          onChange={handleSortChange}
          style={{ width: '200px' }}
        >
          <Option value="name">Sort by Name</Option>
          <Option value="city">Sort by City</Option>
        </Select>
      </div>
      <Row justify="center" gutter={[16, 16]} className="mt-5" style={{ padding: '0 16px' }}>
        {loading ? (
          <Spinner />
        ) : (
          sortedLocations.map((location) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              key={location.id}
              style={{ marginBottom: '16px' }}
            >
              <Card
                hoverable
                className="card-container"
                cover={
                  <div className="card-cover">
                    <img alt={location.name} src={location.img} />
                  </div>
                }
              >
                <Meta
                  className="card-meta"
                  avatar={<Avatar src={location.img} />}
                  title={location.name}
                  description={`City: ${location.city}`}
                />
                <div className="card-actions">
                  <button className="btn">
                    <a href={`/locations/${location.id}`}>
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

export default ShootingLocations;
