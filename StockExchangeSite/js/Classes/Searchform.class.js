

class SearchForm extends SearchResult {
  constructor() {
     
  }
  getSearchFormResult() {
    let input = document.getElementById("input").value;
    let url = `https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/search?query=${input}&limit=10&exchange=NASDAQ`;
    
    document.getElementById("searchButton").onclick = super.getSearchResult(url)
      
      document.getElementById("loading").style.display = "flex";
    
  };
}
let searchForm = new SearchForm();

searchForm.getSearchFormResult();

