// JavaScript Document
//script voor verzorging pagina 
$(function () {
    var $tabs = $('#verzorging');
    $('#verzorging').tabs({
        active: 1,
        disabled: [3]
    });

//*************************************************
//    als de checkbox veranderd dan moet er gekeken of die checked is
//    als die checked is dan word tab 3 op enabled gezet
//    als die niet checked is dan word de tab op disabled gezet
//    $('#toonWaterplanten').change(function () {
//        if (this.checked) {
//            $('#verzorging').tabs('enable', 3).tabs("option", "active", 3);
//        }
//        else {
//            $('#verzorging').tabs("option", "active", 0).tabs('disable', 3);
//        }
//    });

//*************************************************
    //wpi = waterplanten index
    $('#toonWaterplanten').change(function () {
        var wpI = $('.ui-tabs-nav a').index($('a[href=#waterplanten]'));
        if (this.checked) {
            $tabs.tabs('enable', wpI).tabs("option", "active", wpI);
        }
        else {
            $tabs.tabs("option", "active", 0).tabs('disable', wpI);
        }
    });


//*************************************************
//toonziektes on click een functie die de url niet laat uitvoeren
    $('#toonZiektes').one('click',function (e) {
        e.preventDefault();
        //berekend aantal tabs
        var aantalTabs = $('.ui-tabs-nav a').length;
        var tekst = "ziektes";
        //element inhoud is div id ziektes
        var eInh = "<div id='" + tekst + "'>";
        //ekelebt kubj us link naar ziektes
        var eLink = "<li><a href='#" + tekst + "'>" + tekst + "</a></li>";
        //nieuwe tabinhoud is die div die ziektes.html inlaad
        var $nieuweTabInhoud = $(eInh).load("inc/ziektes.html");
        //tab verzorging append inhoud
        $tabs.append($nieuweTabInhoud);  //inhoud toevoegen
        //verzirgubg zoekt ul en append daar de li link aan
        $tabs.find("ul").append(eLink);  //navigatie item toevoegen
        //processen van de toegevoegde tabs
        $tabs.tabs("refresh");
        //de tab actief maken die niet bijgemaakt is
        $tabs.tabs("option", "active", aantalTabs);
        $(this).remove();
    });
});
