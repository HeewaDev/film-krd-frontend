import React, { useState, useEffect } from 'react';
import './films.css'; // Ensure this path is correct
import { useDispatch, useSelector } from 'react-redux';
import { getCompanies } from '../Redux/Actions/companies.actions.jsx'; // Adjust the action import based on your setup
import { Card, Col, Row, Avatar, Input, Select } from 'antd';
import Spinner from '../components/Spinner';
import ResponsiveAppBar from "../components/DefaultLayout";

const { Meta } = Card;
const { Option } = Select;

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name'); // Default sort option
  const dispatch = useDispatch();
  const { companies, loading } = useSelector((state) => state.CompaniesReducer); // Adjust according to your Redux state structure

  useEffect(() => {
    dispatch(getCompanies()); // Dispatch action to fetch companies
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  const sortedCompanies = companies
    .filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'type') {
        return a.type.localeCompare(b.type);
      }
      return 0;
    });

  return (
    <div>
      <ResponsiveAppBar />
      <div className="search-sort-bar">
        <Input
          placeholder="Search companies"
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
          <Option value="type">Sort by Type</Option>
        </Select>
      </div>
      <Row justify="center" gutter={[16, 16]} className="mt-5" style={{ padding: '0 16px' }}>
        {loading ? (
          <Spinner />
        ) : (
          sortedCompanies.map((company) => (
            <Col
              xs={24}
              sm={12}
              md={8}
              lg={6}
              xl={6}
              key={company.id}
              style={{ marginBottom: '16px' }}
            >
              <Card
                hoverable
                className="card-container"
                cover={
                  <div className="card-cover">
                    <img alt={company.name} src={company.img} />
                  </div>
                }
              >
                <Meta
                  className="card-meta"
                  avatar={<Avatar src={company.img} />}
                  title={company.name}
                  description={`Type: ${company.type}, Address: ${company.address}`}
                />
                <div className="card-actions">
                  <button className="btn">
                    <a href={`/companies/${company.id}`}>
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

export default Companies;
