import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const ALL_GENRES = [
  'Shounen', 'Mystery', 'Seinen', 'Supernatural',
  'Sports', 'Mecha', 'Psychological', 'Shoujo',
  'Science Fiction', 'Adventure', 'Drama', 'Slice of Life'
];
const VALID_MBTIS = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP'
];

export default function SearchBar({ mbti, genres, setMbti, setGenres, onSearch }) {
  const [isMbtiOpen, setIsMbtiOpen] = useState(false);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const mbtiRef = useRef(null);
  const genreRef = useRef(null);

  // Reset Genres
  const handleClearGenres = () => {
    setGenres([]);
    setIsGenreOpen(false); 
  };

  // Dropdown
  useEffect(() => {
    const handleClickOutside = e => {
      if (mbtiRef.current && !mbtiRef.current.contains(e.target)) {
        setIsMbtiOpen(false);
      }
      if (genreRef.current && !genreRef.current.contains(e.target)) {
        setIsGenreOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Checkbox
  const handleCheckbox = (value, checked) => {
    if (checked) {
      setGenres([...genres, value]);
    } else {
      setGenres(genres.filter(g => g !== value));
    }
  };

  // Button
  const handleSearchClick = () => {
    if (!VALID_MBTIS.includes(mbti)) {
      alert('Please enter a MBTI');
      return;
    }
    if (genres.length === 0) {
      setGenres(ALL_GENRES);
    }
    onSearch();
  };

  return (
    <div className="search-bar">
      {/* MBTI */}
      <div
        className={`dropdown${isMbtiOpen ? ' open' : ''}`}
        ref={mbtiRef}
      >
        <div
          className="dropdown-header"
          onClick={e => {
            e.stopPropagation();
            setIsMbtiOpen(o => !o);
            setIsGenreOpen(false);
                   }}
        >
          <span>{mbti || 'Choose your MBTI'}</span>
          <span className="arrow"></span>
        </div>
        {isMbtiOpen && (
          <div className="dropdown-list">
            {VALID_MBTIS.map(m => (
              <label key={m}>
                <input
                  type="radio"
                  name="mbti"
                  value={m}
                  checked={mbti === m}
                  onChange={e => setMbti(e.target.value)}
                />
                {m}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Genres */}
      <div
        className={`dropdown${isGenreOpen ? ' open' : ''}`}
        ref={genreRef}
      >
        <div
          className="dropdown-header"
          onClick={e => {
            e.stopPropagation();
            setIsGenreOpen(o => !o);
            setIsMbtiOpen(false);
          }}
        >
          <span>{genres.length > 0 ? genres.join(', ') : 'Choose Genres (optional)'}</span>
          <span className="arrow"></span>
        </div>
        {isGenreOpen && (
          <div className="dropdown-list">
            {ALL_GENRES.map(gen => (
              <label key={gen}>
                <input
                  type="checkbox"
                  value={gen}
                  checked={genres.includes(gen)}
                  onChange={e => handleCheckbox(gen, e.target.checked)}
                />
                {gen}
              </label>
            ))}
          </div>
        )}
      </div>
      
      <button onClick={handleClearGenres}>Reset Genres</button>
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}
