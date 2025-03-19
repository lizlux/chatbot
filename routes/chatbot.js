// // import OpenAI from "openai";
// // const client = new OpenAI();

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

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");

  res.render("chatbot", { title: "chatbot" });
});

module.exports = router;
