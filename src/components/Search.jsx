import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '25%', // Adjust width as needed
  margin: '0 auto', // Center horizontally
  marginTop: '20px', // Adjust margin as needed
  marginBottom: '20px', // Adjust margin as needed
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  [theme.breakpoints.up('sm')]: {
    width: '35%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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
    <div className="search-container"> {/* Apply the search-container class here */}
      <Search>
        <SearchIconWrapper>
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search films..."
          inputProps={{ 'aria-label': 'search' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <IconButton
          onClick={handleSearch}
          size="large"
          edge="end"
          aria-label="search"
          sx={{ ml: 1 }}
        >
          <SearchIcon />
        </IconButton>
      </Search>

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
          <p></p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
