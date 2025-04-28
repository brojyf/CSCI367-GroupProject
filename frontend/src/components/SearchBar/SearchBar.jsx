import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';  

const ALL_GENRES = [
  'Shounen','Mystery','Seinen','Supernatural',
  'Sports','Mecha','Psychological','Shoujo',
  'Science Fiction','Adventure','Drama','Slice of Life'
];
const VALID_MBTIS = [
  'INTJ','INTP','ENTJ','ENTP',
  'INFJ','INFP','ENFJ','ENFP',
  'ISTJ','ISFJ','ESTJ','ESFJ',
  'ISTP','ISFP','ESTP','ESFP'
];

export default function SearchBar({ mbti, genres, setMbti, setGenres, onSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(open => !open);
  };

  // Close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle checkbox
  const handleCheckbox = (value, checked) => {
    if (checked) {
      setGenres([...genres, value]);
    } else {
      setGenres(genres.filter(g => g !== value));
    }
  };

  // Selected Text
  const selectedText = genres.length > 0 ? genres.join(', ') : 'Choose Genres:';

  // Search check
  const handleSearchClick = () => {
    const v = mbti.trim().toUpperCase();
    if (!VALID_MBTIS.includes(v)) {
      alert('Please enter a valid MBTI (eg. INFJ)');
      return;
    }
    if (genres.length === 0) {
      alert('Please select at least one genre');
      return;
    }
    setMbti(v);
    onSearch();
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="MBTI"
        value={mbti}
        onChange={e => setMbti(e.target.value)}
      />

      <div
        className={`dropdown-checkbox${isOpen ? ' open' : ''}`}
        ref={dropdownRef}
      >
        <div className="dropdown-header" onClick={toggleOpen}>
          <span>{selectedText}</span>
          <span className="arrow"></span>
        </div>
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
      </div>

      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
}
