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
    console.log(chunk.choices[0].delta.content);
  }

  // const story = completion.choices[0].message.content;
  // console.log(story);

  res.render("chatbot", { title: "chatbot", story: "foo" });
});

module.exports = router;
