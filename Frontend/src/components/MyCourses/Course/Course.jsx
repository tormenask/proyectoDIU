import React from "react";

import "./Course.css";
function Course({ name, code}) {
  return (
    <div className="col-12 col-sm-12 col-md-6 col-xl-6 col-xxl-4 courseCol">
      <div className="card course" id={code}>
        <img
          src={`src/assets/backgroundDefaultCourse${Math.floor(Math.random() * 4) + 1}.jpg`}
          className="card-img-top course"
          alt="..."
          id="courseImg"
        />
        <div className="card-body course">
          <h5 className="card-title course" id="courseCode">
            {code}
          </h5>
          <h5 className="card-title course" id="courseName">
            {name}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Course;
