/*
File: js/HW3JavaScript.js
GUI Assignment: Creating an Interactive Dynamic Table 
This webpage creates a dynamic multiplication table based on user input using HTML, CSS, and JavaScript.
Peyton Somerville
10/16/2021
*/

function genTable() {
    // get values from form
    var minColVal = Number(document.getElementById("minColVal").value);
    var maxColVal = Number(document.getElementById("maxColVal").value);
    var minRowVal = Number(document.getElementById("minRowVal").value);
    var maxRowVal = Number(document.getElementById("maxRowVal").value);
    // console.log(minColVal, maxColVal, minRowVal, maxRowVal);


    // error checking
    // check if values are blank
    if (!minColVal) {
        minColVal = 0;
    }
    if (!minRowVal) {
        minRowVal = 0;
    }
    if (!maxColVal) {
        maxColVal = 10;
    }
    if (!maxRowVal) {
        maxRowVal = 10;
    }

    var message = "";
    document.getElementById("errorMessages").innerHTML = message;

    // check if value is a float
    if (minColVal % 1 != 0) {
        message += "<p>The minimum column value is not an integer. Value has been rounded.</p>";
        minColVal = Math.round(minColVal);
    }
    if (maxColVal % 1 != 0) {
        message += "<p>The maximum column value is not an integer. Value has been rounded.</p>";
        maxColVal = Math.round(maxColVal);
    }
    if (minRowVal % 1 != 0) {
        message += "<p>The minimum row value is not an integer. Value has been rounded.</p>";
        minRowVal = Math.round(minRowVal);
    }
    if (maxRowVal % 1 != 0) {
        message += "<p>The maximum row value is not an integer. Value has been rounded.</p>";
        maxRowVal = Math.round(maxRowVal);
    }

    // check if min > max
    if (minColVal > maxColVal) {
        message += "<p>The minimum column value should be less than the maximum column value. Values have been swapped.</p>";
        var tempCol = minColVal;
        minColVal = maxColVal;
        maxColVal = tempCol;
    }
    if (minRowVal > maxRowVal) {
        message += "<p>The minimum row value should be less than the maximum row value. Values have been swapped.</p>";
        var tempRow = minRowVal;
        minRowVal = maxRowVal;
        maxRowVal = tempRow;
    }

    // check if values between -200 and 200
    if (minColVal < -200) {
        message += "<p>The minimum column value should be at least -200. Setting value to -200.</p>";
        minColVal = -200;
    }
    if (maxColVal > 200) {
        message += "<p>The maximum column value should not be more than 200. Setting value to 200.</p>";
        maxColVal = 200;
    }
    if (minRowVal < -200) {
        message += "<p>The minimum row value should be at least -200. Setting value to -200.</p>";
        minRowVal = -200;
    }
	if (maxRowVal > 200) {
        message += "<p>The maximum row value should not be more than 200. Setting value to 200.</p>";
        maxRowVal = 200;
    }

    if (minColVal > 200) {
        message += "<p>The minimum column value should not be more than 200. Setting value to 200.</p>";
        minColVal = 200;
    }
    if (maxColVal < -200) {
        message += "<p>The minimum column value should be at least -200. Setting value to -200.</p>";
        maxColVal = -200;
    }
    if (minRowVal > 200) {
        message += "<p>The minimum row value should not be more than 200. Setting value to 200.</p>";
        minRowVal = 200;
    }
    if (maxRowVal < -200) {
        message += "<p>The maximum row value should be at least -200. Setting value to -200.</p>";
        maxRowVal = -200;
    }

    document.getElementById("errorMessages").innerHTML = message;
    // console.log(minColVal, maxColVal, minRowVal, maxRowVal);


    // initialize matrix
    var colSize = maxColVal - minColVal + 1
    var rowSize = maxRowVal - minRowVal + 1
    var arr = new Array(rowSize);
    for (var i = 0; i < rowSize; i++) {
        arr[i] = new Array(colSize);
    }

    // fill matrix
    var x = minColVal;
    var y = minRowVal;
    var product;
    var prodCommas;
    for (var i = 0; i < rowSize; i++) {
        for (var j = 0; j < colSize; j++) {
            product = x * y;
            if (product >= 1000 || product <= -1000) {	// insert commas
                prodCommas = product.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                arr[i][j] = prodCommas;
            }
            else {
                arr[i][j] = product;
            }
            x++;
        }
        x = minColVal;
        y++;
    }
    
    // print matrix for testing
    /*for (var i = minColVal; i <= maxColVal; i++) {
        console.log(i + ", ");
    }
    var counter = minRowVal;
    for (var i = 0; i < rowSize; i++) {
        console.log(counter++ + ": " + arr[i] + "\n");
    }*/


    // building the html for the table
    var table = "<table>";
    table += "<tr>";
    table += "<th>*</th>";
    for (var i = minColVal; i <= maxColVal; i++) {
        table += "<th>" + i + "</th>";
    }
    table += "</tr>";
  
    var rowNum = minRowVal;
    for (var i = 0; i < rowSize; i++) {
        table += "<tr>";
        table += "<td>" + rowNum++ + "</td>";
        for (var j = 0; j < colSize; j++) {
            table += "<td>" + arr[i][j] + "</td>";
        }
        table += "</tr>";
    }

    table += "</table>";
    document.getElementById("multTable").innerHTML = table;

    return false;
}