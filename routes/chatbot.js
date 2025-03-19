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

  // Send an initial message
  res.write(`data: Connected to server\n\n`);

  // Simulate sending updates from the server
  // let counter = 0;
  // const intervalId = setInterval(() => {
  //   counter++;
  //   // Write the event stream format
  //   res.write(`data: Message ${counter}\n\n`);
  //   console.log(`data: Message ${counter}\n\n`);
  // }, 2000);

  // When client closes connection, stop sending events
  req.on("close", () => {
    // clearInterval(intervalId);
    res.end();
  });

  const stream = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: "Write a one-sentence bedtime story about a unicorn.",
      },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    if (chunk.choices[0].finish_reason === "stop") {
      console.log("time to stop");
      res.write(`data: end\n\n`);
      // res.end();
    } else {
      const content = chunk.choices[0].delta.content;
      console.log(content);
      res.write(`data: ${content}\n\n`);
    }
  }

  // const story = completion.choices[0].message.content;
  // console.log(story);

  // res.json({ chatbot: "foo" });
});

module.exports = router;
