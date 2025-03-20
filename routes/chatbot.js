var express = require("express");
var router = express.Router();

var OpenAI = require("openai");
const client = new OpenAI();

// /* GET users listing. */
// router.get("/", async function (req, res, next) {
//   // const completion = await client.chat.completions.create({
//   //   model: "gpt-4o",
//   //   messages: [
//   //     {
//   //       role: "user",
//   //       content: "Write a one-sentence bedtime story about a unicorn.",
//   //     },
//   //   ],
//   // });

//   // const story = completion.choices[0].message.content;

//   // console.log(story);

//   res.send("foo");
// });

// module.exports = router;

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // const stream = await client.chat.completions.create({
  //   model: "gpt-4o",
  //   messages: [
  //     {
  //       role: "user",
  //       content: "Write a one-sentence bedtime story about a unicorn.",
  //     },
  //   ],
  //   stream: true,
  // });

  // for await (const chunk of stream) {
  //   console.log(chunk.choices[0].delta.content);
  // }

  // const story = completion.choices[0].message.content;
  // console.log(story);

  res.render("chatbot", { title: "chatbot", story: "foo" });
});

router.get("/prompt", async function (req, res, next) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cached-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("prompt has been called");
  const { prompt } = req.query;
  console.log(prompt);
  if (!prompt) {
    console.error("no prompt");
    res.end();
  }

  // When client closes connection, stop sending events
  req.on("close", () => {
    res.end();
  });

  const stream = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    if (chunk.choices[0].finish_reason === "stop") {
      console.log("time to stop");
    } else {
      const content = chunk.choices[0].delta.content;
      console.log(content);
      res.write(`data: ${content}\n\n`);
    }
  }
});

module.exports = router;
