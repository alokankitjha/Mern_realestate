import React, { useState } from 'react';
import "./Searchbar.scss";
import search from "../../public/search.png";
import { Link } from 'react-router-dom';

const types = ["buy", "rent"];

export default function Searchbar() {
  const [query, setQuery] = useState({
    type: "rent",
    location: "",
    min: "",
    max: ""
  });

  const switchType = (val) => {
    setQuery(prev => ({ ...prev, type: val }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuery(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="searchbar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            className={query.type === type ? "active" : ""}
            onClick={() => switchType(type)}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="mainborder">
        <input
          type='text'
          name='location'
          placeholder='city location'
          value={query.location}
          onChange={handleInputChange}
        />
        <input
          type='number'
          name='min'
          placeholder='min price'
          min={0}
         // value={query.min}
          onChange={handleInputChange}
        />
        <input
          type='number'
          name='max'
          placeholder='max price'
          max={100000000}
       // value={query.max}
          onChange={handleInputChange}
        />
        <Link
          to={`/list?type=${query.type}&city=${query.location}&minPrice=${query.min}&maxPrice=${query.max}`}
        >
          <button className='buttbar'>
            <img src={search} alt="Search" />
          </button>
        </Link>
      </div>
    </div>
  );
}
