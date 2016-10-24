var webdriver = require('selenium-webdriver');

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var URL_to_monitor = "https://www.megaparts.bg" +
                        "/products/avtochasti/chasti-po-kupeto-malogabaritni/ogledala" +
                        "?pa_marka-avtomobil=21" +
                        "&pa_model-avtomobil=212" +
                        "&productFilterSubmitted=1";

debugger;
driver.sleep(5000);
driver.get(URL_to_monitor);
driver.getTitle().then(function(title){
  console.log(title);
})

driver.sleep(10000);
driver.quit();