import React from "react";

import Card from "./Card";

const cardFaces = [
  "gem",
  "gem",
  "paper-plane",
  "paper-plane",
  "anchor",
  "anchor",
  "bolt",
  "bolt",
  "cube",
  "cube",
  "leaf",
  "leaf",
  "bicycle",
  "bicycle",
  "bomb",
  "bomb"
];

export default function CardBoard() {
  return (
    <ul>
      {cardFaces.map((face, index) => (
        <Card key={index} cardFace={face} />
      ))}
    </ul>
  );
}
