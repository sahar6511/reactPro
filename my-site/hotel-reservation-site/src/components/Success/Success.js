import React from "react";
import "../../styles/main.scss";

const Success = (props) => {
  return <div className="success container-custom">{props.children}</div>;
};

export default Success;
