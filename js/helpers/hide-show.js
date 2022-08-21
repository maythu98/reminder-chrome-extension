import { submit } from "./form.js";

var coll = document.getElementsByClassName("collap");
var i;
for (let i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display == "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

document.getElementById("walking-switch").style.display = "none";
document.getElementById("eye-switch").style.display = "none";

export function actionBtnHideShow(name = "walking", value = "show")
{
  let id = `${name}-switch`;
  let ele = document.getElementById(id);
  ele.style.display = value == "show" ? "block" : "none";
}


export function hideShowToggle(value) {
  let main = document.querySelector(value);
  main.classList.toggle("active");
  var content = main.nextElementSibling;
  if (content.style.display == "block") {
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
}


// Handle Time Setting Buttons
const btnWalkingForm = document.getElementById("btnWalking");
const btnEyeForm = document.getElementById("btnEye");

btnWalkingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submit(btnWalkingForm);
  hideShowToggle(".walking-collap");
});

btnEyeForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  submit(btnEyeForm);
  hideShowToggle(".eye-collap");
});
