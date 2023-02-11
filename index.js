let crossBtn = document.querySelector(".cross");
let rightDiv = document.querySelector(".right");
let addCreativeBtn = document.querySelector(".addCreativeBtn");
let doneBtn = document.querySelector(".done");
let inputTitle = document.querySelector(".title");
let inputSubTitle = document.querySelector(".subTitle");
let searchInput = document.querySelector(".titleInput");
let progressBar = document.querySelector(".html");
let completText = document.querySelector(".completeText");
let coloredBtn = document.querySelector(".wrapBtn");
let colorFilterBtn = document.querySelector(".wrapFilterBtn");

let checkobj = {};
let selectedColr = "";
let cardData = [];
let typingTimer;
let typeInterval = 500;
let filterByColor = [];
let prevSelectedId = "";

inputTitle.addEventListener("keyup", () => {
  checkobj["title"] = inputTitle.value;
  if (Object.keys(checkobj).length === 3) {
    doneBtn.disabled = false;
  }
});
inputSubTitle.addEventListener("keyup", () => {
  checkobj["subTitle"] = inputSubTitle.value;
  if (Object.keys(checkobj).length === 3) {
    doneBtn.disabled = false;
  }
});

crossBtn.addEventListener("click", () => {
  rightDiv.style.display = "none";
  addCreativeBtn.disabled = false;
});

addCreativeBtn.addEventListener("click", () => {
  rightDiv.style.display = "flex";
  addCreativeBtn.disabled = true;
  doneBtn.disabled = true;
});

function submitForm() {
  var input = document.getElementsByName("array[]");
  let obj = {};
  for (var i = 0; i < input.length; i++) {
    var a = input[i];
    let key = a.className;
    obj[key] = a?.value;
  }
  if (selectedColr) {
    obj["color"] = selectedColr;
  }
  cardData.push(obj);
  progressBar.style.width = calculateProgressBar(cardData);
  completText.innerHTML = calculateText(cardData);
  showTheCardList(cardData);
  document.getElementById("formdata").reset();
  checkobj = {};
  doneBtn.disabled = true;
  if (prevSelectedId) {
    document.getElementById(prevSelectedId).style.border = null;
  }
}

const calculateText = (data) => {
  let len = data?.length;
  switch (len) {
    case 1:
      return "1/5 Creatives";
    case 2:
      return "2/5 Creatives";
    case 3:
      return "3/5 Creatives";
    case 4:
      return "4/5 Creatives";
    default:
      return "4/5 Creatives";
  }
};
const calculateProgressBar = (data) => {
  let len = data?.length;
  switch (len) {
    case 1:
      return "20%";
    case 2:
      return "40%";
    case 3:
      return "60%";
    case 4:
      return "80%";
    default:
      return "100%";
  }
};
coloredBtn.addEventListener("click", function (e) {
  selectedColr = e.target.value;
  checkobj["color"] = e.target.value;
  if (Object.keys(checkobj).length === 3) {
    doneBtn.disabled = false;
  }
  console.log("prevSelectedId", prevSelectedId);
  if (prevSelectedId) {
    document.getElementById(prevSelectedId).style.border = null;
  }
  if (prevSelectedId != e.target.id) {
    document.getElementById(e.target.id).style.border = "1px solid #FF00FF";
    prevSelectedId = e.target.id;
  }
});

colorFilterBtn.addEventListener("click", (e) => {
  let filterColor = e.target.value;
  let newData = cardData.filter((el) => el.color === filterColor);
  filterByColor = [...filterByColor, ...newData];
  showTheCardList(filterByColor);
});

const showTheCardList = (data) => {
  document.getElementById("CardSection").innerHTML = data
    .map((el) => {
      return `<div class="Card" style='background-color: ${el?.color};'>
    <h3 class="cardtitle">${el.title}</h3>
    <div class="cardtitle Sub">${el.subTitle}</div>
    </div>`;
    })
    .join(" ");
};

searchInput.addEventListener("keyup", () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(liveSearch, typeInterval);
});

function liveSearch() {
  let cards = document.querySelectorAll(".Card");
  let search_query = searchInput.value;
  console.log("search_query", search_query);
  for (var i = 0; i < cards.length; i++) {
    if (cards[i].innerText.toLowerCase().includes(search_query.toLowerCase())) {
      cards[i].classList.remove("is-hidden");
    } else {
      cards[i].classList.add("is-hidden");
    }
  }
}
