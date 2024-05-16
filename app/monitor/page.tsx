//@ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
import EnergyGraph from "@/components/EnergyGraph";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Spinner } from "@nextui-org/react";

export default function Monitor() {
  const [energyData, setEnergyData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [ailoading, setAiLoading] = useState(false);
  
  const [ailive, setAilive] = useState(null);
  const [liveon, setLiveon] = useState(false);

  const [clear, setClear] = useState(false);

  const [liveIntervalId, setLiveIntervalId] = useState(null);

  const startLiveUpdates = () => {
    setLiveIntervalId(setInterval(generateLive, 5000));
    setLiveon(true);
  };

  const stopLiveUpdates = () => {
    clearInterval(liveIntervalId);
    setLiveIntervalId(null);
    setLiveon(false);
  };

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
      const lastFiveEntries = energyData.slice(-10);

      // Prepare data for OpenAI API (adjust based on OpenAI API requirements)
      // const inputData = lastFiveEntries.map((entry) => entry.power).join("\n");
      const inputData = lastFiveEntries
        .map((entry) => {
          return `Voltage: ${entry.voltage}V, Current: ${entry.current}A, Power: ${entry.power}W, Energy: ${entry.energy}kWh`;
        })
        .join("\n");

      // Make a request to OpenAI API (replace YOUR_OPENAI_API_ENDPOINT with the actual endpoint)
      // const openaiResponse = await fetch(
      //   `${process.env.NEXT_PUBLIC_HOST}/api/gpt`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       prompt: inputData,
      //     }),
      //   }
      // );

      const openaiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/gpt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `You are embedded in a esp32 energy monitor website, and you are given the following information: ${inputData}. Now give a brief about energy usage based on data provided and some unique plagiarism free comments on this and provide some suggestions, dont add any headings just give paragraphs`,
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

  const generateLive = async () => {
    try {
      await getLive();
    } catch (error) {
      console.error("Error generating AI response:", error);
    }
  };

  const getLive = async () => {
    try {
      // Extract the last 5 energy data entries
      const lastFiveEntries = energyData.slice(-10);

      // Prepare data for OpenAI API (adjust based on OpenAI API requirements)
      // const inputData = lastFiveEntries.map((entry) => entry.power).join("\n");
      const inputData = lastFiveEntries
        .map((entry) => {
          return `Voltage: ${entry.voltage}V, Current: ${entry.current}A, Power: ${entry.power}W, Energy: ${entry.energy}kWh`;
        })
        .join("\n");

      const openaiResponse = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/gemini`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `You are embedded in a esp32 energy monitor website live energy dashboard, and you are given the following information: ${inputData}. Now give a brief about energy usage information, dont add any headings.`,
          }),
        }
      );

      if (openaiResponse.ok) {
        const suggestionsData = await openaiResponse.json();
        setAilive(suggestionsData); // Update state with OpenAI suggestions
        console.log(suggestionsData);
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
    const initialIntervalId = setInterval(fetchData, 5000);

    // Clean up the initial interval on component unmount
    return () => clearInterval(initialIntervalId);
  }, []);

  return (
    <>
      {liveon && (
        <Card
          isBlurred
          shadow="md"
          className="w-[90vw] mx-auto mt-10 min-h-[20vh]"
        >
          <CardBody>
            <div className="flex justify-center items-center font-semibold">
              {!ailive ? <Spinner size="lg" /> : ailive.completion}
            </div>
          </CardBody>
        </Card>
      )}

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

              {/* <Button
              className="mt-2 bg-white rounded-sm border shadow-md dark:bg-black"
              onClick={clearHistory}
            >
              Clear History
            </Button> */}
            </span>
            {/* {clear && (
            <span className="text-xl flex justify-end mt-3 text-red-600">
              History Cleared!
            </span>
          )} */}
          </div>
          <div>
            <EnergyGraph energyData={energyData} />
          </div>
        </div>

        <div className="justify-center mx-auto w-full flex">
          <div>
            <div className="text-2xl flex flex-col mb-5">
              <span className="text-center mx-auto text-gray-800">
                AI Suggestions
              </span>
              <div className="flex justify-center mt-2 gap-2">
                <Button
                  className="bg-green-500 text-white hover:bg-green-600 rounded-sm border shadow-md"
                  onClick={generateAiResponse}
                >
                  Generate AI Response
                </Button>

                {liveon ? (
                  <Button
                    className="bg-rose-600 text-white rounded-sm border shadow-md dark:bg-black font-semibold"
                    onClick={stopLiveUpdates}
                  >
                    LIVE ON
                  </Button>
                ) : (
                  <Button
                    className="bg-white rounded-sm border shadow-md dark:bg-black font-semibold"
                    onClick={startLiveUpdates}
                  >
                    LIVE OFF
                  </Button>
                )}
              </div>
            </div>

            <div className="text-lg font-semibold">
              {/* <p>Suggestions:</p> */}
              {ailoading ? <Spinner size="lg" /> : suggestions.response}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
