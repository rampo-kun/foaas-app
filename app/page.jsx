"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";
import { urls } from "@/constants/constants";

const array = urls;

const Home = () => {
  const [hasData, setHasData] = useState("");
  const [hasFrom, setHasFrom] = useState();
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");

  const randomIndex = Math.floor(Math.random() * array.length);

  const randomElement = array[randomIndex];

  const generateFO = async () => {
    if (name == "" || from == "") {
      return;
    }

    let updatedElement = randomElement.replace(":from", from);
    updatedElement = updatedElement.replace(":name", name);
    updatedElement = updatedElement.replace(":company", name); // Use `name` or correct it if needed

    try {
      const res = await fetch(`https://foaas.dev${updatedElement}`, {
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();
      console.log(data);

      setHasData(data.message);
      setHasFrom(data.subtitle);
      // setName("");
      // setFrom("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-wrap gap-2">
          <div>
            <label htmlFor="name">To</label>
            <input
              type="text"
              name="name"
              value={name}
              className="border-2 ml-1 p-2 focus:outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="from">From</label>
            <input
              type="text"
              name="from"
              value={from}
              className="border-2 ml-1 p-2 focus:outline-none"
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-4">
          <div className="container">
            {hasData && <p className="text-center">{hasData}</p>}
            <h2 className="text-right mr-4 mt-2">
              from <span className="font-bold">{hasFrom}</span>
            </h2>
          </div>
          <div className="relative w-[50vw] h-[50vh] mb-2">
            <Image
              src="/assets/pngwing.com.png"
              alt="image"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <button
          onClick={generateFO}
          className="border-2 border-red-400 w-44 p-2 hover:bg-red-400 hover:text-white transition-colors duration-100"
        >
          Generate FO message
        </button>
      </div>
    </div>
  );
};

export default Home;
