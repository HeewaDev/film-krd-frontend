import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query) return; // Do not fetch data if query is empty
    try {
      const response = await axios.post(`http://localhost:7000/films/?q=${query}`);
      setResults(response.data.films || []); // Ensure results are set correctly
      console.log(response.data.films);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]); // Ensure results are set to an empty array on error
    }
  };

  const handleFilmClick = (query) => {
    navigate(`/films/${query}`);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
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
