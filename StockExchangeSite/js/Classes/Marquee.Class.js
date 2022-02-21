let marqueeArray = [];
let urlM =
  "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/etf/list";

class Marquee {
  constructor() {}

  async init() {
    await this.getFetchMarquee();
    await this.printMarquee();
  }

  getFetchMarquee() {
    return fetch(urlM)
      .then((response) => response.json())
      .then((data) => {
        this.data = data;
        
      });
  }
  printMarquee() {
        for (let i = 0; i < 100; i++) {
      marqueeArray.push("  " + this.data[i].symbol + " $" + this.data[i].price + "  ");
      document.getElementById("marqueeP").innerHTML = marqueeArray;
      
    }
  }
}
