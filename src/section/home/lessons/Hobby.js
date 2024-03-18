import React from "react";

const Hobby = ({ hobby, onDelete }) => {
  return (
    <>
    
      <span className="interset">
        {hobby} <i class="fas fa-times"  style={{color:'red', marginLeft:'5px',marginRight:'5px',
        cursor:'pointer'}}
        onClick={onDelete}>X</i>
      </span>
    </>
  );
};

export default Hobby;