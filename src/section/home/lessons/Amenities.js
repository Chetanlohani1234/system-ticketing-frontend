import React from "react";

const Amenities = ({ amen, onDelete }) => {
  return (
    <>
    
      <span className="interset">
        {amen} <i class="fas fa-times" style={{color:'red', marginLeft:'5px',marginRight:'5px',
        cursor:'pointer'}}
         onClick={onDelete}>X</i>
      </span>
    </>
  );
};

export default Amenities;