var webdriver = require("selenium-webdriver");
var Promise = require("bluebird");

var By = webdriver.By;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var URL_to_monitor = "https://www.megaparts.bg" +
                        "/products/avtochasti/chasti-po-kupeto-malogabaritni/ogledala" +
                        "?pa_marka-avtomobil=21" +
                        "&pa_model-avtomobil=212" +
                        "&productFilterSubmitted=1";

driver.get(URL_to_monitor).then(function(){
  console.log("Page is ready");
});
driver.getTitle().then(function(title){
  console.log(title);
});

driver.findElements(By.className("product-grid-item"))
  .then(function(parts){
    var parsed_parts = [];
    parts.forEach(function(part){
        parsed_parts.push( extract_info(part) );
    });

    return Promise.all(parsed_parts);
  })
  .then(function(parsed_parts){
    console.log(parsed_parts);
  });

driver.quit();

function extract_info(part) {
    return Promise.all([
        // hte product image
      part.findElement(By.css(".product-image img"))
              .getAttribute("src"),
        // the product ID
      part.findElement(By.css(".product-image"))
              .getAttribute("href"),
        // the description of the product
      part.findElement(By.css(".name"))
              .getAttribute("title"),
        // the price
      part.findElement(By.css(".price"))
              .getText(),
    ]);
}