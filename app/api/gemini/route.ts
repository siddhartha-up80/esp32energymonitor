//@ts-nocheck


export const POST = async (request, res) => {
  const { prompt } = await request.json();
  console.log(prompt);

  try {
   
    const response = await fetch("https://apinator.vercel.app/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `${prompt}`,
      }),
    });
    
    // console.log(response.json());
    const { completion } = await response.json();
    

    return new Response(JSON.stringify({ completion }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch all energy data", { status: 500 });
  }
};
