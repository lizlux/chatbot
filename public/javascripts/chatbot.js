const formElem = document.getElementById("form");
const stopElem = document.getElementById("stop");
const askChatbot = document.getElementById("ask-chatbot");
const responseElem = document.getElementById("response");
let responseText = "";
let eventSource;

stopElem.onclick = (e) => {
  e.preventDefault();
  eventSource?.close();
  stopElem.classList.add("hidden");
};

askChatbot.onclick = async (e) => {
  e.preventDefault();
  const formData = new FormData(formElem);
  const prompt = formData.get("prompt");
  stopElem.classList.remove("hidden");

  eventSource = new EventSource(
    `/chatbot/prompt?prompt=${encodeURIComponent(prompt)}`
  );

  eventSource.onmessage = (event) => {
    console.log(event.data);
    responseText = `${responseText}${event.data}`;
    responseElem.innerHTML = responseText;
  };

  eventSource.onerror = function (event) {
    console.log("Error occurred:", event);
    eventSource.close();
  };
};
