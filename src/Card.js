import React from "react";

export default function Card(props) {
  return (
    <li>
      <i className={`fa fa-${props.cardFace}`} />
    </li>
  );
}
