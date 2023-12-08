// app/api/clearhistory.ts
import { connectToDB } from "@/utils/database";
import Energy from "@/models/energydata";

export const POST = async (req: any, res: any) => {
  try {
    await connectToDB();

    // Delete all data from the Energy collection
    await Energy.deleteMany({});

     return new Response("Deleted all energy data", { status: 200 });
  } catch (error) {
    console.error("Error clearing history:", error);
     return new Response("Failed to fetch all energy data", { status: 500 });
  }
};
