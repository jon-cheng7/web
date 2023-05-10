import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <div class="edu">
      <div class="pic">
        <img class="uni" src={require("../assets/waterloo.jpeg")} alt="uni"/>
      </div>
      <p class="edutext">I am currently attending the University of Waterloo for Software Engineering. Prior to University, I went to Agincourt Collegiate Institute where I graduated with my French Diploma as well as Outstanding Academic Excellence</p>
    </div>
  );
};

export default Education;
