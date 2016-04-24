/**
 * 
 */

  var request = require("request");
  var fs = require("fs");
  var cheerio = require("cheerio");
  var iconv = require('iconv-lite');
  var BufferHelper = require('bufferhelper');
  request({
    url: "https://stock-ai.com/dailyDataQuery.php",
    method: "POST",
    body: "a=c&symbolCode=%5ENZ50&from=2015%2F04%2F24&to=2016%2F04%2F24&hash=d41d8cd98f00b204e9800998ecf8427e",
      headers: {
    	    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    	  },
      agentOptions: {
    	    ca: fs.readFileSync("./GeoTrustGlobalCA.crt")
    }
  }, function(e,r,b) {
    if(e || !b) 
    {  console.log('error\n'+e);
    console.log(r);
    console.log(b);
    	return; }
   
    var $ = cheerio.load(b);
    var result = [];
    var titles = $("#DivIXReFund_IX");
    console.log(b);
    console.log($(titles[0]).text());
    var string=$(titles[0]).text();

   // for(var i=0;i<titles.length;i++) {
   //   result.push($(titles[i]).text());
   //   console.log($(titles[i]).text());
   // }
   // fs.writeFileSync("result.json", JSON.stringify(result));
  });