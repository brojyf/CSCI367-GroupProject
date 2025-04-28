import React, { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar'
import ResultsTable from './components/ResultsTable/ResultsTable';
import './App.css';

function App() {
  const [mbti, setMbti] = useState('');
  const [genres, setGenres] = useState([]);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(
      `/api/characters?mbti=${encodeURIComponent(mbti)}&genres=${encodeURIComponent(genres.join(','))}`
    );
    const json = await res.json();
    if (json.success) {
      setResults(json.data);
    } else {
      alert("Failed to search in db");
      setResults([]); 
    }
  };

  return (
    <div className="App">
      <h1>Find Anime Characters By MBTI</h1>
      <SearchBar
        className="search-bar"
        mbti={mbti}
        genres={genres}
        setMbti={setMbti}
        setGenres={setGenres}
        onSearch={handleSearch}
      />
      <ResultsTable className="results-table" data={results} />
    </div>
  );
}

export default App;
