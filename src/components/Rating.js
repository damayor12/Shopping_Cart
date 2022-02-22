import React from 'react'
import {AiOutlineStar, AiFillStar} from 'react-icons/ai'

const Rating = ({rating, onClick, style}) => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <span style={style} key={i} onClick={()=>onClick(i)}>
          {rating > i  ? <AiFillStar fontSize="15px" /> : <AiOutlineStar fontSize="15px" />}
        </span>
      ))}
    </>
  );
}

export default Rating