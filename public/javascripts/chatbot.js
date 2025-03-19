const formElem = document.getElementById("form");

formElem.onsubmit = (e) => {
  e.preventDefault();
  const formData = new FormData(formElem);

  console.log(formData.get("prompt"));
};
