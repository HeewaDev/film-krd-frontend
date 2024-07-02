import React, { useState, useEffect } from 'react';
import './films.css'; // Ensure this path is correct
import { useDispatch, useSelector } from 'react-redux';
import { getCasts } from '../Redux/Actions/casts.action.jsx'; // Adjust the action import based on your setup
import { Card, Col, Row, Avatar, Input, Select } from 'antd';
import Spinner from '../components/Spinner';
import ResponsiveAppBar from "../components/DefaultLayout";

const { Meta } = Card;
const { Option } = Select;

const Casts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name'); // Default sort option
  const dispatch = useDispatch();
  const { casts, loading } = useSelector((state) => state.CastsReducer); // Adjust according to your Redux state structure

  useEffect(() => {
    dispatch(getCasts()); // Dispatch action to fetch casts
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const sortedCasts = casts
    .filter((cast) =>
      cast.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cast.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cast.bio.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'role') {
        return a.role.localeCompare(b.role);
      }
      return 0;
    });

  return (
    <div>
      <ResponsiveAppBar />
      <div className="search-sort-bar">
        <Input
          placeholder="Search casts"
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
          <Option value="role">Sort by Role</Option>
        </Select>
      </div>
      <Row justify="center" gutter={[16, 16]} className="mt-5" style={{ padding: '0 16px' }}>
        {loading ? (
          <Spinner />
        ) : (
          sortedCasts.map((cast) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              key={cast.id}
              style={{ marginBottom: '16px' }}
            >
              <Card
                hoverable
                className="card-container"
                cover={
                  <div className="card-cover">
                    <img alt={cast.name} src={cast.img} />
                  </div>
                }
              >
                <Meta
                  className="card-meta"
                  avatar={<Avatar src={cast.img} />}
                  title={cast.name}
                  description={`Role: ${cast.role}, Bio: ${cast.bio}`}
                />
                <div className="card-actions">
                  <button className="btn">
                    <a href={`/casts/${cast.id}`}>
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

export default Casts;
