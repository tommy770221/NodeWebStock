/**
 * 
 */
  var request = require("request");
  var fs = require("fs");
  var cheerio = require("cheerio");
  var iconv = require('iconv-lite');
  var BufferHelper = require('bufferhelper');
  var md5 = require('md5');
  var querystring = require("querystring");
  
  //指定主要指數
  var country=['^FTSE','^NZ50','^SSEC'];
  fs.writeFileSync("result.csv",'country,one week,one month,three month,six month \n');
  
  for(j=0;j<country.length;j++){
  var date=new Date();
  console.log(country[j]);  
  console.log(querystring.stringify({symbolCode:country[j]}));
  console.log((date.getFullYear()-1).toString());
  console.log( date.getMonth() + 1);
  console.log( date.getDate());
 
  request({
    url: "https://stock-ai.com/dailyDataQuery.php",
    method: "POST",
    body: "a=c&"+querystring.stringify({symbolCode:country[j]})+"&from="+(date.getFullYear()-1).toString()+"%2F"+(date.getMonth()+ 1)+"%2F"+(date.getDate())+"&to="+(date.getFullYear()-1).toString()+"%2F"+(date.getMonth()+ 1)+"%2F"+(date.getDate())+"&hash=d41d8cd98f00b204e9800998ecf8427e",
      headers: {
    	    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
    	  },
      agentOptions: {
    	    ca: fs.readFileSync("./GeoTrustGlobalCA.crt")
    }
    }, function(e,r,b) {
     if(e || !b) 
     {  
       console.log('error\n'+e);
       console.log(r);
       console.log(b);
      return; 
      }
     var result =country[j]+',';

      console.log(b);
      var dataJson=JSON.parse(b);
      console.log(dataJson.v0);
      var $ = cheerio.load(dataJson.v0+dataJson.v1+dataJson.v2+dataJson.v3);
      var titles = $("span");
  
      for(var i=0;i<titles.length;i++) {
        result=result+$(titles[i]).text()+',';
        console.log($(titles[i]).text());
      }
      fs.appendFileSync("result.csv",result+'\n');
   });
  };