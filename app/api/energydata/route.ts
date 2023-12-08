import Energy from "@/models/energydata";
import { connectToDB } from "@/utils/database";

export const POST = async (request: any, response: any) => {


  try {
    // console.log(JSON.stringify(request.json()));
    const { voltage, current, power, energy } = await request.json();
    
    console.log("Received data from ESP32:");
    console.log(
      `Voltage: ${voltage}V, Current: ${current}A, Power: ${power}W, Energy: ${energy}kWh`
    );

   
    await connectToDB();

    const energydata = new Energy({
      voltage,
      current,
      power,
      energy,
    });

    await energydata.save();
    // Respond with a success message
    return new Response(
      JSON.stringify({ message: "Data received successfully" }, energydata),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Failed to add energy data", {
      status: 500,
    });
  }
};
