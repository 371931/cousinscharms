"use client";
import React, { useEffect, useState } from "react";

interface Props {
  title: string;
}

interface Item {
  id: number;
  name: string;
}

const Home: React.FC<Props> = ({}) => {
  const [items, setItems] = useState<Item[]>([]);
  useEffect(() => {
    fetch("/api/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  console.log(items);

  return <h1>{JSON.stringify(items)}</h1>;
};

export default React.memo(Home);
