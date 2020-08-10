let textBox = document.querySelector(".text-box");
let submit = document.querySelector(".submit");
let bookmarkContainer = document.querySelector(".bookmark-container");
let trash = document.querySelector(".trash");
let notificationHint = document.querySelector(".hint-notification");
let questionCircle = document.querySelector(".question-circle");
let processInfo = document.querySelector(".process-info");


// EVENT LISTENERS
submit.addEventListener("click", addBookmark);
bookmarkContainer.addEventListener("click", removeBookmark);
// show hint after loading full page.
window.addEventListener("load", function (event) {
  notificationHint.style.opacity = "1";
  setTimeout(function () {
    notificationHint.style.opacity = "0";
  }, 5000);
});

// show hint when hovering on question circle.
questionCircle.addEventListener("pointerover", function () {
  notificationHint.style.opacity = "1";
  setTimeout(function () {
    notificationHint.style.opacity = "0";
  }, 3000);
});

// FUNCTIONS
function addBookmark(event) {
  event.preventDefault();

  if (isEmpty(textBox)) {
    notification(
      "rgb(226, 41, 41)",
      "rgb(226, 41, 41)",
      "rgb(245, 114, 114)",
      "Input an URL..."
    );
  } else {
    let valid = isValid(textBox.value);
    if (valid) {
      let link = getSiteLink(textBox.value); // add bookmark

      let name = getName(link);
      bookmarkContainer.innerHTML += `<div class="bookmark">
        <div class="bookmark-header">
          <span>${name}</span> <span class="trash"><i class="fas fa-trash-alt"></i></span>
        </div>
        <a href="${textBox.value}" target="_blank">
          <img
            class="bookmark-logo"
            src="//logo.clearbit.com/${link}?size=120"
          />
        </a>
        
      </div>`;

      textBox.value = "";
      notification(
        "rgb(9, 162, 9)",
        "rgb(38, 83, 38)",
        "rgb(115, 220, 115)",
        "Bookmark Added!"
      );
    } else {
      notification(
        "rgb(226, 41, 41)",
        "rgb(226, 41, 41)",
        "rgb(245, 114, 114)",
        "Invalid URL..."
      );
    }
  }
}

function removeBookmark(event) {
  let trash = event.target.closest(".trash");
  console.log(event.target);
  if (trash) {
    let bookmark = event.target.closest(".bookmark");
    bookmark.remove();
  }
}

function isEmpty(field) {
  if (!field.value) {
    return true;
  } else {
    return false;
  }
}

function isValid(url) {
  let result = /^(https?):\/\/(www\.)[(a-z)|(A-Z)|(0-9)]+\.[a-z]+\/?$/.test(
    url
  );
  return result;
}

function getSiteLink(url) {
  let link = url.match(/(www\.)[(a-z)|(A-Z)|(0-9)]+\.[a-z]+\/?$/);
  return link[0];
}

function getName(url) {
  let nameStr = url.match(/.\b\w+\b\./)[0];
  let nameArr = Array.from(nameStr);
  nameArr.shift();
  nameArr.pop();
  return nameArr.join("");
}

// positioning hint box
let circleCoords = questionCircle.getBoundingClientRect();
notificationHint.style.left = window.scrollX + circleCoords.left - 34 + "px";

notificationHint.style.top =
  window.scrollY + circleCoords.top + textBox.clientHeight / 2 + 3 + "px";

// notification function
function notification(bdColor, fontColor, bgColor, text) {
  processInfo.style.cssText = `
    opacity:1;
    background-color: ${bgColor};
    color: ${fontColor};
    border-color:${bdColor};
  `;

  processInfo.innerHTML = text;
  setTimeout(function () {
    processInfo.style.opacity = "0";
  }, 3000);
}
