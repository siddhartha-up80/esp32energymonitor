"use client";

import React, { useState } from "react";
import EnergyTable from "@/components/EnergyTable";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const History = () => {
  const [clear, setClear] = useState(false);

  const clearHistory = async () => {

        alert("History Button is Disabled for now because of some random users")
    // try {
    //   const res = await fetch(
    //     `${process.env.NEXT_PUBLIC_HOST}/api/clearhistory`,
    //     {
    //       method: "POST",
    //     }
    //   );

    //   if (res.ok) {
    //     console.log("History cleared successfully");
    //     // Optionally, you can update the state or take other actions after successful deletion
    //     setClear(true);
    //     setTimeout(() => {
    //       setClear(false);
    //     }, 5000)
    //   } else {
    //     console.error("Failed to clear history");
    //     // Handle the error (display a message or take other actions)
    //   }
    // } catch (error) {
    //   console.error("Error clearing history:", error);
    //   // Handle the error (display a message or take other actions)
    // }
  };

  return (
    <div className="md:p-10 p-2">
      <div className="">
        <div className="text-2xl w-full flex flex-col mb-5">
          <span className="text-center mx-auto">Energy History</span>
          <span className="flex justify-between w-full">
            <Link href="/monitor">
              <Button className="mt-2 bg-white rounded-sm border shadow-md dark:bg-black">
                View Dashboard
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
          <EnergyTable />
        </div>
      </div>
    </div>
  );
};

export default History;
