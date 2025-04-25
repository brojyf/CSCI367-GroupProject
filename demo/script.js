import React, { useState } from 'react';

function RosePriceFetcher() {
  const [date, setDate] = useState('');
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchPrice = () => {
    if (!date) {
      alert('Select a date');
      return;
    }
    setLoading(true);
    setErrorMsg('');
    setPrice(null);

    fetch(`/api/rose-price?date=${date}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          setPrice(data.price);
        } else {
          setErrorMsg("Cannot find the price");
        }
      })
      .catch(err => {
        setLoading(false);
        console.error(err);
        setErrorMsg("Failed");
      });
  };

  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
      />
      <button onClick={fetchPrice}>Search Rose Price</button>

      {loading && <div>Loading…</div>}

      {!loading && price !== null && <div>价格：{price}</div>}
      {!loading && errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
    </div>
  );
}

export default RosePriceFetcher;
