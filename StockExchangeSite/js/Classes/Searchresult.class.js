document.getElementById("loading").style.display = "none";
let input = document.getElementById("input").value;
let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input}&limit=10&exchange=NASDAQ`;
let link = ` ./company.html?symbol=`;

class SearchResult {
  constructor() {}

  getSearchResult() {
    document.getElementById("loading").style.display = "flex";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          this.data = data;
        
          document.getElementById("loading").style.display = "none";

          const divStock = document.createElement("a");
          divStock.href = `${link}${item.symbol}`;
          divStock.innerHTML = `${item.symbol} ${item.name}`;
          divStock.id = "divStock";

          document.getElementById("answer").append(divStock);

          const companyUrl = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/${item.symbol}`;

          fetch(companyUrl)
            .then((response) => response.json())
            .then((data) => {
              const companyData = data["profile"];

              const imgLogo = document.createElement("img");
              imgLogo.id = "imgLogo";
              imgLogo.src = companyData["image"];
              imgLogo.alt = "Logo";
              imgLogo.classList.add("logo");
              document.getElementById("answer1").append(imgLogo);

              const change = document.createElement("div");
              if (companyData["changes"] >= 0) {
                change.classList.add("profit", "change", "positive");
              } else {
                change.classList.add("profit", "change", "negative");
              }
              change.textContent = `(${companyData["changes"]}%)`;

              document.getElementById("answer3").append(change);
            });
        });
      });
  }
}
const search = document.getElementById("searchButton");
search.addEventListener("click", (event) => {
  const searchText = event.target.value;
  const regex = new RegExp(searchText, "gi");

  let text = this.item.name;
  text = text.replace(/(<mark class="highlight">|<\/mark>)/gim, "");

  const newText = text.replace(regex, '<mark class="highlight">$&</mark>');
  divStock.innerHTML = newText;
});
const searchResult = new SearchResult();

document
  .getElementById("searchButton")
  .addEventListener("click", searchResult.getSearchResult);
