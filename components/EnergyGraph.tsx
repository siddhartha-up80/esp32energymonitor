//@ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false, // This line is important to prevent SSR during build
});

// const isBrowser = () => typeof window !== "undefined";

const EnergyGraph = ({ energyData }) => {
    const [isBrowser, setIsBrowser] = useState(false);


  const formatIndianTime = (isoString) => {
    const options = {
      timeZone: "Asia/Kolkata", // Indian timezone
      hour12: false,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Date(isoString).toLocaleString("en-IN", options);
  };

    useEffect(() => {
      setIsBrowser(true);
    }, []);

  const chartData = {
    series: [
      {
        name: "Voltage", // You can change the metric name here
        data: energyData.map((entry) => parseInt(entry.voltage)),
        // Add similar entries for other metrics (current, power, energy) if needed
      },
      {
        name: "Current", // You can change the metric name here
        data: energyData.map((entry) => parseInt(entry.current)),
        // Add similar entries for other metrics (current, power, energy) if needed
      },
      {
        name: "Power", // You can change the metric name here
        data: energyData.map((entry) => parseInt(entry.power)),
        // Add similar entries for other metrics (current, power, energy) if needed
      },
      {
        name: "Energy", // You can change the metric name here
        data: energyData.map((entry) => parseInt(entry.energy)),
        // Add similar entries for other metrics (current, power, energy) if needed
      },
    ],
    options: {
      chart: {
        height: 650,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Energy Data from esp32",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: energyData.map((entry) => formatIndianTime(entry.time)),
      },
    },
  };
  
  const chartData2 = {
    series: [
      {
        name: "Current", // You can change the metric name here
        data: energyData.map((entry) => parseInt(entry.current)),
        // Add similar entries for other metrics (current, power, energy) if needed
      },
      {
        name: "Energy", // You can change the metric name here
        data: energyData.map((entry) => parseInt(entry.energy)),
        // Add similar entries for other metrics (current, power, energy) if needed
      },
    ],
    options: {
      chart: {
        height: 650,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Energy Data from esp32",
        align: "left",
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: energyData.map((entry) => formatIndianTime(entry.time)),
      },
    },
  };
  

  return (
    <div id="chart" className="min-w-[60vw]">
      {isBrowser && (
        <div>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="line"
            height={350}
          />
          <ReactApexChart
            options={chartData2.options}
            series={chartData2.series}
            type="line"
            height={350}
          />
        </div>
      )}
    </div>
  );
};

export default EnergyGraph;
