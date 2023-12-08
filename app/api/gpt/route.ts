//@ts-nocheck
// import { Configuration, OpenAIApi } from "openai";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = async (request, res) => {
  const { prompt } = await request.json();
  console.log(prompt)

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `You are embedded in a esp32 energy monitor website, and you are given the following information: ${prompt}. Now give a brief about energy usage based on data provided and some unique plagiarism free comments on this and provide some suggestions`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    const { choices } = response.data;
    const completion = choices[0].text.trim();

    return new Response(JSON.stringify({ completion }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to fetch all energy data", { status: 500 });
  }
};
