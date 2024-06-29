import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return; // Do not fetch data if query is empty or only whitespace

    try {
      const response = await axios.get(`http://localhost:7000/films/search?q=${encodeURIComponent(query)}`);
      setResults(response.data || []); // Set results to the data returned by the backend
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]); // Set results to an empty array on error
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilmClick = (filmId) => {
    navigate(`/films/${filmId}`);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search films..."
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display search results */}
      <div>
        {results.length > 0 ? (
          results.map((film) => (
            <div key={film.id} onClick={() => handleFilmClick(film.id)}>
              <h3>{film.title}</h3>
              <p>{film.synopsis}</p>
              {/* Add more details as needed */}
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
