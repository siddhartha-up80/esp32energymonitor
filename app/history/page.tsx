import React from "react";
import EnergyTable from "@/components/EnergyTable";

const History = () => {
  return (
    <div className="md:p-10 p-2">
      <div className="">
        <span className="text-2xl text-center flex justify-center w-full mb-5">
          Energy History
        </span>
        <div>
          <EnergyTable />
        </div>
      </div>
    </div>
  );
};

export default History;
