"use client";

import React, { useState, useEffect } from "react";
import EnergyGraph from "@/components/EnergyGraph";
import Link from "next/link";
import { Button } from "@nextui-org/button";

export default function Monitor() {
  const [energyData, setEnergyData] = useState([]);

  const [clear, setClear] = useState(false);

  const clearHistory = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/clearhistory`,
        {
          method: "POST",
        }
      );

      if (res.ok) {
        console.log("History cleared successfully");
        // Optionally, you can update the state or take other actions after successful deletion
        setClear(true);
        setTimeout(() => {
          setClear(false);
        }, 5000);
      } else {
        console.error("Failed to clear history");
        // Handle the error (display a message or take other actions)
      }
    } catch (error) {
      console.error("Error clearing history:", error);
      // Handle the error (display a message or take other actions)
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getdata`);
      const json = await res.json();
      setEnergyData(json);
    } catch (error) {
      console.error("Error fetching energy data:", error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchData();

    // Setup interval to fetch data every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures the effect runs only once during mount

  return (
    <div className="md:p-10 p-2 md:flex md:justify-center md:items-center md:w-full mx-auto">
      <div className="">
        <div className="text-2xl w-full flex flex-col mb-5">
          <span className="text-center mx-auto">Energy Graph</span>
          <span className="flex justify-between w-full">
            <Link href="/history">
              <Button className="mt-2 bg-white rounded-sm border shadow-md dark:bg-black">
                View History
              </Button>
            </Link>

            <Button
              className="mt-2 bg-white rounded-sm border shadow-md dark:bg-black"
              onClick={clearHistory}
            >
              Clear History
            </Button>
          </span>
          {clear && (
            <span className="text-xl flex justify-end mt-3 text-red-600">
              History Cleared!
            </span>
          )}
        </div>
        <div>
          <EnergyGraph energyData={energyData} />
        </div>
      </div>
    </div>
  );
}
