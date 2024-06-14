import React from 'react';
import PropTypes from 'prop-types';
import Card from '../../Components/Card/Card';
import "./List.scss";

export default function List({ dataa }) {
  console.log(dataa)
  if (!dataa || dataa.length === 0) {
    return <div className="listitem">No data available</div>;
  }

  console.log(dataa[1]?.id); // Optional chaining to avoid errors if dataa is not an array or has less than 2 items

  return (
    <div className="listitem">
      {dataa.map((data) => (
        <Card key={data.id} data={data} />
      ))}
    </div>
  );
}

List.propTypes = {
  dataa: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      // Define other properties of data here based on the Card component's requirements
    })
  ).isRequired,
};

List.defaultProps = {
  dataa: [],
};
