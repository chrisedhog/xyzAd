// Created by Chris Hogben, 2020 for Playground XYZ

"use strict";

// Creating a funciton that does a Matrix-y style augmentation of the paragraph to write "Wake up, Neo..."
const newString = "Wake up, Neo...";
var str = String.fromCharCode(66);
var par = document.getElementById("leadin");
var message = par.innerHTML;
var reformatPara;

function funcy() {
    reformatPara = setInterval(trinityMessage, 30);
}

function trinityMessage() {

    // Part 1: begin deleting message until only enough chars left for newString
    if (message.length > newString.length) {
        // delete one
        message = message.substring(1);
        // mix up the characters of the next 5
        for(let i = 0; i <= 5; i++) {
            // randomly change the first 5 characters
            message = setCharAt(message, i, randomAsciiVal());
            par.innerHTML = message;
        } 
    } else {
        
    }
    
    // Part 2: resolve remaining characters to = newString
    if (message.length == newString.length) {

        for(let i = 0; i < newString.length; i++) {
            if(message.charCodeAt(i) != newString.charCodeAt(i)) {
                writeText(i);
                par.innerHTML = message;
            }  
        }
    }
    
    // Part 3: stop once the new string has been written on
    if (message == newString) {
    clearInterval(reformatPara);
    // set a timeout to then alter the CSS
    }
    
}

// for slicing and concatenating the message string
function setCharAt(str,index,val) {
    if(index > str.length-1) return str;
    let chr = String.fromCharCode(val);
    return str.substring(0,index) + chr + str.substring(index+1);
}

// pick a character at random between 33, !, and 127, ~
function randomAsciiVal() {
    let min = Math.ceil(33);
    let max = Math.floor(127);
    let val =  Math.floor(Math.random() * (max - min) + min);
    console.log(val);
    return val;
}

// determine if ascii code for char is higher or lower and either add or subtract one
function writeText(i) {
    if(message.charCodeAt(i) > newString.charCodeAt(i)) {
        message = setCharAt(message, i, message.charCodeAt(i)-1);
    } else if(message.charCodeAt(i) < newString.charCodeAt(i)) {
        message = setCharAt(message, i, message.charCodeAt(i)+1);
    }
}