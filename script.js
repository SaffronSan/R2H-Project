let botdata = "", keys = null;
$(document).ready(function(){
  if(localStorage.getItem("theme_mode") != null){
    if(localStorage.getItem("theme_mode") === "dark_mode"){
      $(".mde").text("dark_mode");
      dis_mode_eva(false);
    }else{
      $(".mde").text("light_mode");
      dis_mode_eva(false);
    }
  }else{
    dis_mode_eva(true);
  }
  $.getJSON( "/public/data.json",(data)=> {botdata = data["data"];keys = Object.keys(data.data)});
  if(localStorage.getItem("LastPage") != null){
    getPage(localStorage.getItem("LastPage"));
  }else{
    getPage('home');
  }
  //Best hover effect in the world, changes the style to italic 
  $('.txt').hover(() => {$('.txt').addClass('fst-italic');},()=>{$('.txt').removeClass('fst-italic');});
  $('.mde').click(() => {dis_mode_eva(true);});//dark theme mode event listener
  $('.navbar-brand').click(()=>{//home page 
    getPage('home');
  });
  checkSize($(window).width() <= 742); // check the size if mobile or desktop when the doc is first loaded
  if(!localStorage.hasOwnProperty("meows")){saveToLocalStorage("meows",{});}//adds tweet obj in local storage 
});
$(window).resize(() => {// checks if the doc is chaning sizes
  if($(window).width() <= 742){
    checkSize(true);
  }
  if($(window).width() >= 790){
    checkSize(false);
  }
});
function saveToLocalStorage(key, value) {
  // Check if local storage is supported by the browser
  if (typeof(Storage) !== "undefined") {
    // Set the value for the given key in local storage
    localStorage.setItem(key, value);
  } else {
    alert("Sorry, local storage is not supported by your browser.");
  }
}
function getFromLocalStorage(key) {
  // Check if local storage is supported by the browser
  if (typeof(Storage) !== "undefined") {
    // Get the value for the given key from local storage
    return localStorage.getItem(key);
  } else {
    console.log("Sorry, local storage is not supported by your browser.");
  }
}
function getNumber(values) {
  return  Math.floor(Math.random() * values.length);
}
//check and changes the ui 
function checkSize(mobile){
  if(mobile){
    $('.menu').removeAttr("hidden");
    $('.navbar-nav').addClass('offcanvas offcanvas-end offcanvas-sm px-2');
    $('.mn').removeClass('navbar-expand-sm').addClass('');
    $('.bdiv').prepend($('.navbar-nav').children().eq(6));
  }else{
    $('.menu,.bdiv').attr("hidden",'true');;
    $('.navbar-nav').removeClass('offcanvas offcanvas-end offcanvas-sm px-2');
    $('.mn').addClass('navbar-expand-sm').removeClass('flex-row-reverse');
    //$('.navbar-nav').children().eq(6).appendTo($('.bdiv'));
    $('.m').appendTo($('.navbar-nav'));
  }
}
// this returns a loading div 
function makeWaste(){
  let waster = $("<div>",{class:'container w-100 container-md flex-column load-cont d-flex align-items-center justify-content-center',style:"height: 800px;"}).append($("<div>",{class:'progress w-100'}));
  waster.children('.progress').append($("<div>",{class:'progress-bar progress-bar-striped progress-bar-animated bg-danger',id:'lod',text:'0%'}));
  $(waster).append($('<div>',{class:'text-center spn w-100'}))
  $($(waster).children('.spn')).append($('<label>',{class:'txt',text: 'loading'}));
  $('<span>',{class : 'ld spinner-border spinner-border-sm'}).appendTo($(waster).children('.spn'));
  return waster;
}
// sldies left
let slideLeft = (ele='',start,end,speed) => {
  for(var i = start; i >= end ;i -= speed){ 
    $(ele).animate({'margin-left' : i + 'px'},1.5,'linear');
  }
};
let emSender = (body,type = true) =>{
    Email.send({
      SecureToken : "dde5f9dd-e897-4aa1-856f-264ea9452534",
      To : 'anishthapa2156@gmail.com',
      From : "redsavage2x@gmail.com",
      Subject : type? "User tweet" : "Contact Form",
      Body : body
  }).then(
    message => alert(message)
  );
  }
// adds a event listern and a button to every h3,h6 tag so you can go back to the table of content 
let back_to_start = () => {
  $('h3,h6').append($("<a>",{href : '#toc',class : 'text-decoration-none bck',text:'#',style:"margin-left: 5px; display: none;"})).css('cursor','pointer');
  $('h3,h6').click((e)=>{
    $(e.target).children('.bck').toggle("slow");
  });
};//dark theme mode function
let dis_mode_eva = (click) =>{
  $('.mde').text(click? $('.mde').text().includes('dark')? "light_mode" : "dark_mode" : $(".mde").text());
  let mode = $('.mde').text();
  saveToLocalStorage("theme_mode",mode);
  if (mode == 'dark_mode'){
    $('.mn').removeClass('navbar-light').addClass('bg-dark navbar-dark');
    $('.cbtn,.fa-solid').removeClass('text-dark').addClass('text-light');
    $('.ibtn').removeClass('bg-dark').addClass('bg-light');
    $(".fbtn").removeClass("bg-white");
    $('.mobile , a,h4,h2,.txt').addClass('text-light');
    $('.v').css({'color' : 'black', 'border-color' : 'white'});
    $('.btn-close').addClass('btn-close-white');
    $('.cimg,.card-img-top').addClass("bg-white");
    $('.list-group-item').addClass("border-white");
    $('.offcanvas,footer,main,.card,.carousel, .brand,.mhd,.list-group-item,.dropdown-item,.dropdown-header,.dropdown-item-text,.dropdown-menu,input,.fbtn,.form-select,textarea,.pn,.modal-content,.x').addClass('bg-dark text-light');
    $('.brand,.navbar-nav,main,footer,.card,.prof-div,.cbtn,.card-body,.sub,.fbtn,.form-select,textarea,input,.dropdown-header,.nav-tabs,.pn.active,.wrapper,.x').removeClass('border-dark').addClass('border-light');
    $(".table").addClass('table-dark');
    for(var n = 0; n != $('.nav-link').length;n++){
      if($($('.nav-link')[n]).hasClass('active')){
        $($('.nav-link')[n]).removeClass('border-dark').addClass('border-light');
      }
    }
  }
  else{
    $(".table").removeClass('table-dark');
    $('.mn').removeClass('navbar-dark bg-dark').addClass('navbar-light');
    $('.v').css({'color' : 'white', 'border-color' : 'black'});
    $('.mobile, a,h4,h2,.fa-solid').removeClass('text-light');
    $('.btn-close').removeClass('btn-close-white');
    $('.cimg,.card-img-top').removeClass("bg-white");
    $('.list-group-item').removeClass("border-white");
    $('.offcanvas,footer,main,.card,.carousel,.txt,.brand,.mhd,.list-group-item,.dropdown-header,.dropdown-item,.dropdown-item-text,.dropdown-menu,input,.fbtn,.form-select,textarea,.nav-tabs,.pn,.modal-content,.x').removeClass('bg-dark text-light');
    $('.brand,.navbar-nav,main,footer,.card,.prof-div,.cbtn,.card-body,.sub,.fbtn,.form-select,textarea,input,.dropdown-header,.x').removeClass('border-light').addClass('border-dark');
    $('.cbtn').removeClass('text-light').addClass('text-dark');
    $('.ibtn').removeClass('bg-light').addClass('bg-dark');
    $(".fbtn").addClass("bg-white");
    for(var n = 0; n != $('.nav-link').length;n++){
      if($($('.nav-link')[n]).hasClass('active')){
        $($('.nav-link')[n]).removeClass('border-light').addClass('border-dark');
      }
    }
    $('.pn.active,.pn').removeClass("border-dark");
    $(".wrapper,.nav-tabs").removeClass("border-light").addClass("border-dark");
  }
}

function getPage(page){
  let loadingBar = makeWaste();
  let bs = setInterval(loading,17,loadingBar);// calls and add loading div to the main tag
  function loading(e){
    let bar = e.children('.progress').children('.progress-bar');
    if(bar.text().replace('%','') == 0) {$('main').slideUp('slow').empty().append(loadingBar).slideDown('slow').fadeIn('slow').addClass('mx-auto');}
    if(bar.text().replace('%','') != 100){
      bar.text(parseInt(bar.text().replace('%','')) + 1 + '%').width(bar.text());
      if(bar.text().replace('%','') > 60 && bar.text().replace('%','') <= 90){
        bar.removeClass('bg-danger').addClass('bg-warning');
      }else if(bar.text().replace('%','') > 90){
        bar.removeClass('bg-warning').addClass('bg-success');
      }
    }
    if(bar.text().replace('%','') == 100){// after its done, loading is destoryed 
      e.children('.spn').children('.txt').text('Complete');
      spin = e.children('.ld');
      e.children('.spn').children('.ld').fadeOut('slow').remove();
      bar.removeClass('progress-bar-striped');
      console.log('complete');
      clearInterval(bs);
      $('main').slideUp('slow');
      saveToLocalStorage("LastPage",page);
      $.get("/public/"+page+'.html',(data)=>{// request the page and adds it to main 
        try {
          $('main').html(data).slideDown().fadeIn('slow');
          if($('title').text().includes('Career')){back_to_start()};
          $('.ab-header').fadeIn('slow',slideLeft('.ab-header',200,20,3));
          $('.prof').fadeIn('slow',slideLeft('.prof',200,0,3));
          $('title').text($(data).eq(0).text());
          for(var n = 0; n != $('.tb.nav-link').length;n++){// nav active effect
            var shorthand = $($('.tb.nav-link')[n]).children('span').attr("title").replace(/\s/g, '').toLowerCase().replace("!","");
            if($($('.tb.nav-link')[n]).hasClass('active')){
              $($('.tb.nav-link')[n]).removeClass('active border-bottom border-dark border-light');
            }
            if(shorthand === $(data).eq(0).text().replace(/\s/g, '').toLowerCase()){
              $($('.tb.nav-link')[n]).addClass('active border-bottom');
            }
          }
          dis_mode_eva(false);// checks what theme is on and changes the up coming page to it
          if($("title").text().includes("About")){//if on the about me page, loads the tweets
            var localcont = JSON.parse(getFromLocalStorage("meows"));
            for(var i = 0; i < Object.keys(localcont).length; i++){
              var string_element = $.parseHTML(localcont["meow-" + i]);
              $(".feed").append(string_element);
            }
          }
        } 
        catch (error) {
          console.log(error);
        }
    });
    }
  }
}
