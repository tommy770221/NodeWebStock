/**
 * 
 */

  var request = require("request");
  var fs = require("fs");
  var cheerio = require("cheerio");
  var iconv = require('iconv-lite');
  var BufferHelper = require('bufferhelper');
  request({
    url: "https://stock-ai.com/dly-2-%5ENZ50.php",
    method: "GET"
  }, function(e,r,b) {
    if(e || !b) 
    { 
    	return; }
   
    var $ = cheerio.load(b);
    var result = [];
    var titles = $("#DivIXReFund_IX");
    console.log(b);
    console.log($(titles[0]).text());
    var string=$(titles[0]).text();
    console.log(iconv.decode(new Buffer(string), 'big5'));
     for(var i=0;i<titles.length;i++) {
       result.push($(titles[i]).text());
       console.log($(titles[i]).text());
     }
     fs.writeFileSync("result.json", JSON.stringify(result));
   // for(var i=0;i<titles.length;i++) {
   //   result.push($(titles[i]).text());
   //   console.log($(titles[i]).text());
   // }
   // fs.writeFileSync("result.json", JSON.stringify(result));
  });