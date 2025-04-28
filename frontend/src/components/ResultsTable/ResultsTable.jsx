import React from 'react';
import "./ResultsTable.css";

export default function ResultsTable({ data }) {
  if (!data.length) {
    return;
  }
  return (
    <table className="results-table">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Characters</th>
          <th>Anime</th>
          <th>Genre</th>
          <th>Rating</th>
          <th>Hulu</th>
          <th>Crunchyroll</th>
          <th>Others</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr key={item.characterId}>
            <td><img src={item.picturePath} alt={item.PicturePath} /></td>
            <td>{item.characterName}</td>
            <td>{item.animeName}</td>
            <td>{item.genre}</td>
            <td>{item.rating}</td>
            <td>
              {item.hulu
                ? <a href={item.hulu} target="_blank" rel="noopener">Hulu</a>
                : null
              }
            </td>
            <td>
              {item.crunchyroll
                ? <a href={item.crunchyroll} target="_blank" rel="noopener">Crunchyroll</a>
                : null
              }
            </td>
            <td>
              {item.other
                ? <a href={item.other} target="_blank" rel="noopener">Other Platforms</a>
                : null
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
