const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get("symbol");
const companyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${symbol}`;
console.log(symbol)

document.getElementById("loading").style.display = "none";

fetch(companyUrl)
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("loading").style.display = "flex";
  
    const companyData = data["profile"];
   

    const titulo = document.createElement("div");
    titulo.classList.add("accion", "title");
    titulo.id = "title";

    const logo = document.createElement("div");
    logo.classList.add("accion");
    logo.id = "logo";

    const aLogo = document.createElement("a");
    aLogo.classList.add("accion");
    aLogo.id = "aLogo";
    if (companyData["website"] != "") {
      aLogo.href = companyData["website"];
    }

    const imgLogo = document.createElement("img");
    imgLogo.id = "imgLogo";
    imgLogo.src = companyData["image"];
    imgLogo.alt = "company-logo";

    const top = document.createElement("div");
    top.classList.add("accion", "top");
    top.id = "top";

    const descr = document.createElement("div");
    descr.classList.add("description");
    descr.id = "description";

    const topLeft = document.createElement("div");
    topLeft.classList.add("accion", "top-left-body");
    topLeft.id = "topLeft";

    const priceChange = document.createElement("div");
    priceChange.classList.add("accion", "price-change");
    priceChange.id = "priceChange";

    const price = document.createElement("div");
    price.classList.add("accion", "price");
    price.id = "price";

    const container = document.createElement("div");
    container.classList.add("accion", "container");
    container.id = "container";

    const canvas = document.createElement("canvas");
    canvas.id = "myChart";

    const change = document.createElement("div");
    if (companyData["changes"] >= 0) {
      change.classList.add("accion", "change", "positive");
    } else {
      change.classList.add("accion", "change", "negative");
    }
    change.id = "change";

    document.getElementById("bodyWrapper").append(top);
    document.getElementById("top").append(topLeft);
    document.getElementById("topLeft").append(titulo, priceChange);
    document.getElementById("priceChange").append(price, change);
    document.getElementById("top").append(logo);
    document.getElementById("logo").append(aLogo);
    document.getElementById("aLogo").append(imgLogo);

    document.getElementById("bodyWrapper").append(container);

    document.getElementById("container").append(descr);
    document.getElementById("container").append(canvas);
    document.getElementById(
      "change"
    ).textContent = `(${companyData["changes"]}%)`;

    const profit = document.getElementById("price");
    profit.textContent = `USD $ ${companyData["price"]}`;

    const description = document.getElementById("description");
    description.textContent = companyData["description"];

    const title = document.getElementById("title");
    title.textContent = `${companyData["companyName"]} `;
  });

let stockDate = [];
let stockValue = [];

const historyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/${symbol}?serietype=line`;
fetch(historyUrl)
  .then((response) => response.json())
  .then((data) => {
    const historyData = data["historical"];

    for (
      let i = 0;
      i > 299 ? i <= 299 : i <= historyData.length - 1;
      i = i + 10
    ) {
      stockDate.push(historyData[i]["date"]);
      stockValue.push(historyData[i]["close"]);
    }
    const myChart = new Chart("myChart", {
      type: "line",
      data: {
        labels: stockDate.reverse(),
        datasets: [
          {
            fill: false,
            lineTension: 0,
            backgroundColor: "rgb(207, 248, 248)",
            borderColor: "#31bdc2",
            borderWidth: 1,
            data: stockValue.reverse(),
          },
        ],
      },
      options: {
        legend: { display: false },
      },
    });

    document.getElementById("loading").style.display = "none";
  });
