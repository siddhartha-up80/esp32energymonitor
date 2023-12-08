"use client";

import React, { useState, useEffect } from "react";
import EnergyGraph from "@/components/EnergyGraph";

export default function Monitor() {
  const [energyData, setEnergyData] = useState([]);

  useEffect(() => {
    // Fetch your energy data here
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/getdata");
        const json = await res.json();
        setEnergyData(json);
      } catch (error) {
        console.error("Error fetching energy data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="md:p-10 p-2 flex justify-center items-center w-max mx-auto">
      <div className="">
        <span className="text-2xl text-center flex justify-center w-full mb-5">
          Energy Graph
        </span>
        <div>
          <EnergyGraph energyData={energyData} />
        </div>
      </div>
    </div>
  );
}
