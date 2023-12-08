//@ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import EnergyGraph from "@/components/EnergyGraph";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Spinner } from "@nextui-org/react";

export default function Monitor() {
  const [energyData, setEnergyData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [clear, setClear] = useState(false);
  const [ailoading, setAiLoading] = useState(false);

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


  const generateAiResponse = async () => {

    setSuggestions([]);
    setAiLoading(true);

    try {
      // Extract the last 5 energy data entries
      const lastFiveEntries = energyData.slice(-5);

      // Prepare data for OpenAI API (adjust based on OpenAI API requirements)
      // const inputData = lastFiveEntries.map((entry) => entry.power).join("\n");
      const inputData = lastFiveEntries
        .map((entry) => {
          return `Voltage: ${entry.voltage}V, Current: ${entry.current}A, Power: ${entry.power}W, Energy: ${entry.energy}kWh`;
        })
        .join("\n");

      // Make a request to OpenAI API (replace YOUR_OPENAI_API_ENDPOINT with the actual endpoint)
      const openaiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/gpt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: inputData,
          }),
        }
      );

      if (openaiResponse.ok) {
        const suggestionsData = await openaiResponse.json();
        setSuggestions(suggestionsData); // Update state with OpenAI suggestions
        console.log(suggestionsData);
        setAiLoading(false);
      } else {
        console.error("Failed to fetch suggestions from OpenAI");
      }
    } catch (error) {
      console.error("Error generating AI response:", error);
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
    <div className="md:p-10 p-2 md:flex gap-x-8">
      <div className="">
        <div className="text-2xl flex flex-col mb-5">
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

      <div className="justify-center mx-auto w-full flex">
        <div>
          <div className="text-2xl flex flex-col mb-5 ">
            <span className="text-center mx-auto">AI Suggestions</span>
            <span className="flex justify-center w-full">
              <Button
                className="mt-2 bg-white rounded-sm border shadow-md dark:bg-black"
                onClick={generateAiResponse}
              >
                Generate AI Response
              </Button>
            </span>
          </div>

          <div className="text-lg font-semibold">
            {/* <p>Suggestions:</p> */}
            {ailoading ? <Spinner size="lg" /> : suggestions.completion}
          </div>
        </div>
      </div>
    </div>
  );
}
