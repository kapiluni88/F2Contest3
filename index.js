const request=require('request');
var cheerio = require("cheerio");
const fs = require('fs');

var result=[];

function handleRequest(err,data){
    if(err){
        console.log("Error in fetching data.");
    }

    var $ = cheerio.load(data.body);

    $(".Box-row").each((index,el) => {
        result.push({title : $(el).find('.h3').text().replace(/\s\s+/g,''),
        description : $(el).find('p').text().trim(),
        url : $(el).find('.h3 a').attr('href'),
        stars : $(el).find(".f6 a:nth-of-type(1)").text().trim(),
        forks : $(el).find(".f6 a:nth-of-type(2)").text().trim(),
        language : $(el).find(".repo-language-color + span").text()
    });
    });

    console.log("Respositories:",result);

    fs.writeFile('repo_data.json', JSON.stringify(result), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Data saved to repo_data.json");
        }
    });
    
}

request("https://github.com/trending",handleRequest);


var devResult=[];

function devHandleRequest(err,data){

    if(err){
        console.log("Error in fetching data");
    }

    var $ = cheerio.load(data.body);

    $(".Box-row").each((index,el) => {
        devResult.push({
            devName : $(el).find(".h3").text().replace(/\s\s+/g,''),
            devUserName : $(el).find("p > a").text().trim(),
            repoName : $(el).find(".color-fg-muted + h1").text().trim(),
            description : $(el).find(".color-fg-muted + h1 + div").text().trim()
        });
    })

    console.log("Developers:",devResult);

    fs.writeFile('dev_data.json', JSON.stringify(devResult), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Data saved to dev_data.json");
        }
    });

    

}

request("https://github.com/trending/developers/javascript?since=daily",devHandleRequest)




/////////////////////PUPPETEER....

// var puppeteer=require('puppeteer');

// async function extractData(){
//     const browser = await puppeteer.launch({headless:false});
//     const page = await browser.newPage();
//     await page.goto("https://github.com/trending");
//     await page.waitForSelector(".Box-row");

//     var Allinfo = await page.evaluate(function(){

//         var reposElements = Array.from(document.getElementsByClassName("Box-row"));

//         var ele=[];
        
//         reposElements.forEach(function(inf){
//             ele.push({
//                 title: inf.querySelector('.h3 > a').textContent.replace(/\s\s+/g,'').trim(),
//                 description : inf.querySelector('p').textContent.trim(),
//                 url : inf.querySelector('.h3 a').getAttribute('href'),
//                 stars : inf.querySelector(".f6 a:nth-of-type(1)").textContent.trim(),
//                 forks : inf.querySelector(".f6 a:nth-of-type(2)").textContent.trim(),
//                 language : inf.querySelector(".f6 > span ").textContent.trim()
//         });
//         })

//         return ele;


//     })


//     var devInfo = await page.evaluate(function(){
//         document.querySelector(".subnav a:nth-of-type(2)").click()''
//     });

//     console.log(Allinfo);

    
   
// }
// extractData();