import React from 'react';
import "./List.scss";
import Filter from '../../Components/Filter/Filter';
import Card from '../../Components/Card/Card';
import Map from '../../Components/Map/Map';
import { useLoaderData, useSearchParams } from "react-router-dom"; 

export default function List() {

  const post = useLoaderData();
  const singlePostData = post;
  const dataa = singlePostData.message;
 // console.log(dataa);

  return (
    <div className="list">
      <div className="listleft">
        <Filter />
        {!dataa || dataa.length === 0 ? (
          <h1>No search result for your query</h1>
        ) : (
          dataa.map((data, index) => (
            <Card key={index} data={data} />
          ))
        )}
      </div>
      {dataa && dataa.length > 0 && (
        <div className="listright">
          <Map data={dataa} />
        </div>
      )}
    </div>
  );
}
