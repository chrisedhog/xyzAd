// Created by Chris Hogben, 2020 for Playground XYZ

// var distance = $('p').offset().top,
//     $window = $(window);

// $window.scroll(function() {
//     if ( $window.scrollTop() >= distance ) {
//         console.log("reached the top");
//     }
// });


window.addEventListener('scroll', () => {
    var d = document.getElementsByTagName("P")[3];
    var n = document.getElementById("adbanner");
    var dpos = d.offsetTop;
    var npos = n.offsetTop;
 
    console.log(dpos + " " + npos);

    // var para = document.getElementsByTagName("P")[3];
    // var adBanner = document.getElementById("adbanner");
    // console.log(para.offsetTop);

    // const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
    // const scrollDist = Math.ceil(window.scrollY); 
    // console.log("scrolled");
    // console.log(scrollMax + " " + scrollDist);
});


function myAlert() {
    alert("hello!");
}

