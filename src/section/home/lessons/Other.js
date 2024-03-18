import React from "react";

const Other = ({ others, onDelete }) => {
  return (
    <>
      <span className="interset">
        {others} <i class="fas fa-times" style={{color:'red', marginLeft:'5px',marginRight:'5px',
        cursor:'pointer'}}
        onClick={onDelete}>X</i>
      </span>
    </>
  );
};

export default Other;