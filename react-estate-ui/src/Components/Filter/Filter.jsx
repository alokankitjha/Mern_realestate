import React, { useState } from 'react';
import "./Filter.scss";
import search from "../../../public/search.png";
import { Link, useParams, useSearchParams } from 'react-router-dom';

export default function Filter() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState({
  
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    min: searchParams.get("minPrice") || "",
    max: searchParams.get("maxPrice") || "",
   
   
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  //  console.log('Search query:', query);
    // Perform the search action with the query data
  };

  return (
    <div className="filter">
      <h1>Search Results for {searchParams.get("city")}</h1>
      <form onSubmit={handleSubmit}>
        <div className='t1'>
          <p>Location</p>
          <input 
            type='text' 
            id='city' 
            name='city' 
            placeholder='City Location'
            value={query.city}
            onChange={handleChange}
          />
        </div>
        <div className='t2'>
          <div className="item">
            <label htmlFor="type">Type</label>
            <select 
              name="type" 
              id="type"
              value={query.type}
              onChange={handleChange}
            >  <option value="">any</option>
              <option value="rent">Rent</option>
              <option value="buy">Buy</option>
             
            </select>
          </div>
          <div className="item">
            <label htmlFor="property">Property</label>
            <select 
              name="property" 
              id="property"
              value={query.property}
              onChange={handleChange}
            >
              <option value="">any</option>
              <option value="apartment">Apartment</option>
              <option value="house">House</option>
              <option value="condo">Condo</option>
              <option value="land">Land</option>
            </select>
          </div>
          <div className="item">
            <label htmlFor="minPrice">Min Price</label>
            <input
              type="number"
              id="min"
              name="min"
              placeholder="any"
              min={0}
              value={query.min}
              onChange={handleChange}
            />
          </div>
          <div className="item">
            <label htmlFor="maxPrice">Max Price</label>
            <input
              type="number"
              id="max"
              name="max"
              placeholder="any"
              max={100000000000}
              value={query.max}
              onChange={handleChange} 
            />
          </div>
        
          <div className="item">
            <label className='s'>Search</label>
          
            <Link
          to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.min}&maxPrice=${query.max}&property=${query.property}`}
        >
          <button className='buttbar'>
            <img src={search} alt="Search" />
          </button>
        </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
