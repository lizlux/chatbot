const formElem = document.getElementById("form");
const stopElem = document.getElementById("stop");
const responseElem = document.getElementById("response");
let responseText = "";

formElem.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(formElem);
  const prompt = formData.get("prompt");
  const eventSource = new EventSource(
    `/chatbot/prompt?prompt=${encodeURIComponent(prompt)}`
  );

  eventSource.onmessage = (event) => {
    console.log(event.data);
    responseText = `${responseText} ${event.data}`;
    responseElem.innerHTML = responseText;
  };

  eventSource.onerror = function (event) {
    console.log("Error occurred:", event);
    eventSource.close();
  };

  stopElem.onclick = () => {
    eventSource.close();
  };

  // fetch("/chatbot/prompt", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     prompt,
  //   }),
  // })
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((e) => {
  //     console.error(e);
  //   });
};
