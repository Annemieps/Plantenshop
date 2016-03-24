// JavaScript Document
//script voor homepagina 

//object icoontjes met 2 mogelijke properties. header voor het gesloten blok en headerselected
//voor het actieve blok
var icoontjes = {
  header: "ui-icon-circle-arrow-e",
  headerSelected: "ui-icon-circle-arrow-s"
 };
 
 
$(function(){
    $('#keuzes').accordion({
    active:1,
    icons: icoontjes,
    heightStyle:"content",
    collapsible:true,
    animate:"easeOutCubic"
    });

});//einde doc ready 
