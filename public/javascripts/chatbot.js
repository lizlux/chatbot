const formElem = document.getElementById("form");
const stop = document.getElementById("stop");

formElem.onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(formElem);
  const prompt = formData.get("prompt");
  const eventSource = new EventSource("/chatbot/prompt");

  eventSource.onmessage = (event) => {
    console.log(event);
  };

  eventSource.onerror = function (event) {
    console.log("Error occurred:", event);
    eventSource.close();
  };

  stop.onclick = () => {
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
