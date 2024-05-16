import { NextRequest, NextResponse } from "next/server";
import pThrottle from "p-throttle";
import OpenAI from "openai";

const configuration = {
  apiKey: process.env.OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true,
};
const openai = new OpenAI(configuration);

const throttle = pThrottle({
  limit: 2,
  interval: 1000,
});

export const POST = async (request: NextRequest, res: NextResponse) => {
  const { prompt } = await request.json();
  console.log(prompt);

  const throttledHandleGenerate = throttle(async (prompt: string) => {
    const query = `${prompt}`;

    try {
      const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content: query }],
        model: "gpt-4",
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      const parsableJSONresponse = chatCompletion.choices[0].message.content;
      // console.log("response: ", parsableJSONresponse);
      return parsableJSONresponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  try {
    const response = await throttledHandleGenerate(prompt);

    console.log("response: ", response);

    return new Response(JSON.stringify({ response }), { status: 200 });
  } catch (error) {
    return new Response("Failed to generate response", { status: 500 });
  }
};

// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// export const POST = async (request, res) => {
//   const { prompt } = await request.json();
//   console.log(prompt);

//   try {
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `You are embedded in a esp32 energy monitor website, and you are given the following information: ${prompt}. Now give a brief about energy usage based on data provided and some unique plagiarism free comments on this and provide some suggestions`,
//       temperature: 0,
//       max_tokens: 3000,
//       top_p: 1,
//       frequency_penalty: 0.5,
//       presence_penalty: 0,
//     });

//     const { choices } = response.data;
//     const completion = choices[0].text.trim();

//     return new Response(JSON.stringify({ completion }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     return new Response("Failed to fetch all energy data", { status: 500 });
//   }
// };
