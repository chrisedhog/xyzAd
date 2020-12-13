// Created by Chris Hogben, 2020 for Playground XYZ

"use strict";

// Creating a funciton that does a Matrix-y style augmentation of the paragraph to write "Wake up, Neo..."
const newString = "Wake up, Neo...";
var str = String.fromCharCode(66);
var par = document.getElementById("leadin");
var message = par.innerHTML;
var reformatPara;
var answered = false;

// set the height of the div so that it doesn't keep shrinking and break the scroll exp for user
par.setAttribute("style","height: " + par.offsetHeight + "px");

///////////////////////////////////////////////////
// below code taken from stackoverflow user jonathansampson
// this code is used to detect when the CSS sticky property is triggered on leadin and to execuse matrix function
///////////////////////////////////////////////////

// get the first parent element which is scrollable
const stickyElmScrollableParent = getScrollParent(par);

// save the original offsetTop. when this changes, it means stickiness has begun.
par._originalOffsetTop = par.offsetTop;

// compare previous scrollTop to current one
const detectStickiness = (elm, cb) => () => cb & cb(elm.offsetTop != elm._originalOffsetTop)

// Act if sticky or not
const onSticky = isSticky => {
   par.classList.toggle('isSticky', isSticky)

   if(isSticky) {
    // play
    reformatPara = setInterval(trinityMessage, 300);
   }
}

const scrollCallback = detectStickiness(par, onSticky)
stickyElmScrollableParent.addEventListener('scroll', scrollCallback)

// find-first-scrollable-parent
function getScrollParent(element, includeHidden) {
    var style = getComputedStyle(element),
        excludeStaticParent = style.position === "absolute",
        overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/;

    if (style.position !== "fixed") 
      for (var parent = element; (parent = parent.parentElement); ){
          style = getComputedStyle(parent);
          if (excludeStaticParent && style.position === "static") 
              continue;
          if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) 
            return parent;
      }

    return window
}

// Throttle
function throttle (callback, limit) {
    var wait = false;                  
    return function () {              
        if (!wait) {                   
            callback.call();         
            wait = true;              
            setTimeout(function () {  
                wait = false;        
            }, limit);
        }
    }

}

///////////////////////////////////////////////////
// end stackoverflow code from user jonathansampson
///////////////////////////////////////////////////


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
        // change style on paragraph
        par.style.fontFamily = "'Courier New', Courier, monospace";
        par.style.color = '#258320';

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


function call(res) {
    let call = document.getElementById("phonecall");
    let video = '<video autoplay id="vid" onended="destroyvid()"><source src="media/' + res + '.mp4" type="video/mp4"></video>';
    if (res == "answer") {
        answered = true;
    }
    call.innerHTML = video;
    par.setAttribute("style","position: relative !important;");
}

// update content of phonecall div once video has finished
function destroyvid() {
    let call = document.getElementById("phonecall");
    call.innerHTML = '<div id="endelem"><canvas width="100vw" height="100vh" id="canv"></canvas><div id="cta" style="margin-top: -70vh;"><img src="img/The-matrix-logo.svg" alt="" id="matrix-logo"><p>Escape the simulation.</p><h4>03.08.21</h4><button class="greenbtn">Take the red pill</button></div></div>';
    call.style.background = 'none';

///////////////////////////////////////////////////
// begin code from  Ganesh Prasad
///////////////////////////////////////////////////

    const canvas = document.getElementById('canv');
    const ctx = canvas.getContext('2d');
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

    const w = canvas.width = vw;
    const h = canvas.height = vh;
    console.log("width: " + w + ". Height: " + h);
    const cols = Math.floor(w / 20) + 1;
    const ypos = Array(cols).fill(0);

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    function matrix () {
    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, w, h);
    
    ctx.fillStyle = '#0f0';
    ctx.font = '15pt monospace';
    
    ypos.forEach((y, ind) => {
        const text = String.fromCharCode(Math.random() * 128);
        const x = ind * 20;
        ctx.fillText(text, x, y);
        if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
        else ypos[ind] = y + 20;
    });
    }

    setInterval(matrix, 50);

///////////////////////////////////////////////////
// end code from  Ganesh Prasad
///////////////////////////////////////////////////
}


