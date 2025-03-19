const formElem = document.getElementById("form");

formElem.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(formElem);
  const prompt = formData.get("prompt");

  console.log();

  fetch("/chatbot/prompt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((e) => {
      console.error(e);
    });
};
