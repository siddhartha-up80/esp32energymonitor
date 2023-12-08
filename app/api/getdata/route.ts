import Energy from "@/models/energydata";
import { connectToDB } from "@/utils/database";

export const GET = async (request: any, response:any) => {
  try {
    await connectToDB();

   const { searchParams } = new URL(request.url);
   const page = searchParams.get("page");
   const limit = searchParams.get("limit");

  //  console.log(page, limit);
      const pageNumber = parseInt(page as string, 10);
      const limitNumber = parseInt(limit as string, 10);

      const skip = (pageNumber - 1) * limitNumber;

    const energydata = await Energy.find({}).skip(skip).limit(limitNumber);

    return new Response(JSON.stringify(energydata), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all energy data", { status: 500 });
  }
};
