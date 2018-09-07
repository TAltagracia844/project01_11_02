/*  Project 01_11_02

    Author: Tiffany Altagracia
    Date:   9.4.18

    Filename: script.js
*/

"use strict"; 

// Global Variable 
var httpRequest = false;
var entry = "MSFT";


// Creates XHR object
function getRequestObject(){
    try{
        httpRequest = new XMLHttpRequest();
    }
    catch(requestError){
return false;
    }
    //test function
    // alert(httpRequest);
    return httpRequest;
}

// Function stops any default submission from executing
function stopSubmission(evt){
     //Checks to see if function passes through
    // alert("stopSubmission()");
    if(evt.preventDefault){
        evt.preventDefault();
    }
    else{
        evt.returnValue = false;
    }
}

// Request stock quote data form server
function getQuote(){
    //Checks to see if function passes through
    // alert("getQuote()");
    if(document.getElementsByTagName("input")[0].value){
        entry = document.getElementsByTagName("input")[0].value;
    }
    else{
        document.getElementsByTagName("input")[0].value = entry;
    }
    if(!httpRequest){
        httpRequest = getRequestObject();
    }
    //
    httpRequest.abort();
    httpRequest.open("get", "StockCheck.php?t=" + entry, true);
    httpRequest.send(null);
    //
    httpRequest.onreadystatechange = displayData;
    var updateQuote = setTimeout('getQuote()',10000);
}

// Displays data if the ready stage is equal to 4 and has a status of 200
function displayData(){
    if(httpRequest.readyState === 4 && httpRequest.status === 200){
        var stockResults = httpRequest.responseText;
         //Checks to see if function passes through
        // console.log(stockResults);
        // var stockItems = stockResults.split(/,|\"/);
        var stockItems = JSON.parse(stockResults);
         //Checks to see if function passes through
        // console.log(stockItems);
        // Splits the string and turns the data into a array that are seperated by a comma
        // for (var i = stockItems.length - 1; i >= 0; i-- ){
        //     if(stockItems[i] === ""){
        //         stockItems.splice(i,1);
        //     }
        // }
console.log(stockItems);

        document.getElementById("ticker").innerHTML = stockItems.symbol;
        document.getElementById("openingPrice").innerHTML = stockItems.open;
        document.getElementById("lastTrade").innerHTML = stockItems.latestPrice;
        var date = new Date(stockItems.latestUpdate);
        document.getElementById("lastTradeDT").innerHTML = date.toDateString() + "<br>" + date.toLocaleTimeString();
        document.getElementById("change").innerHTML = (stockItems.latestPrice - stockItems.open).toFixed(2);
        document.getElementById("range").innerHTML = "Low " + (stockItems.low * 1).toFixed(2)  + "<br>High " + (stockItems.high * 1).toFixed(2);
       document.getElementById("volume").innerHTML = (stockItems.latestVolume * 1).toLocaleString();
        // console.log(stockItems);
    }
}
// Gives the table a background color
function formatTable(){
    var rows = document.getElementsByTagName("tr");
    for(var i=0; i < rows.length; i= i + 2){
        rows[i].style.background = "#9FE098";
    }
}

// Event Handler for the page on the submit/load event
var form = document.getElementsByTagName("form")[0];
if(form.addEventListener){
    form.addEventListener("submit", stopSubmission,false);
    window.addEventListener("load",formatTable,false);
    window.addEventListener("load",getQuote,false);

}
else if(form.attachEvent){
    form.attachEvent("onsubmit", stopSubmission);
    window.attachEvent("onload", formatTable);
    window.attachEvent("onload",getQuote)
}
