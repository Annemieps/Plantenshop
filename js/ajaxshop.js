$(function () {
    var $advZoeken = $('#adv_zoeken');
    var $advZoekenLink = $('#adv_zoeken_link');

    //lees localStorage
    var zoek = localStorage.getItem("advZoeken");

    //setting neemt de waarde van zoek over tenzij zoek niet bestaat dan is setting 0
    var setting = (zoek != 0 && zoek != 1) ? 0 : zoek;

    //onmiddellijk toepassen om toestand vorige bezoek in te stellen.
    toggleZoeken(setting, $advZoekenLink, $advZoeken);

    $advZoekenLink.click(function (e) {
        //de e.preventDefault()zorgt ervoor dat de hyperlink’s default action niet uitgevoerd wordt.
        e.preventDefault();
        setting = 1 - setting; //bitwise Xor -- draait setting om
        toggleZoeken(setting, $(this), $advZoeken);
        localStorage.setItem("advZoeken", setting);

    });

    $("#slider-range-hoogte").slider({
        range: true,
        values: [100, 500],
        min: 0,
        max: 5000,
        step: 10,
        //option object te plaatsen als argument van de slider()
        //De functie val() wordt gebruikt om de waarde van een formuliercontrol te lezen/zetten
        slide: function (event, ui) {
            $("#hoogte_min").val($(this).slider("values", 0));
            $("#hoogte_max").val($(this).slider("values", 1));
            herlaadTabel();

        },
        stop: function (event, ui) {
            $("#hoogte_min").val($(this).slider("values", 0));
            $("#hoogte_max").val($(this).slider("values", 1));
            herlaadTabel();

        }
    });

    //initialiseren van de startwaarden
    $("#hoogte_min").val($("#slider-range-hoogte").slider("values", 0));
    $("#hoogte_max").val($("#slider-range-hoogte").slider("values", 1));

    //toevoegen van een title text aan de slideknoppen
    $(".ui-slider-handle", "#slider-range-hoogte")
            .first().attr({'title': 'Minimum hoogte'})
            .end()
            .last().attr({'title': 'Maximum hoogte'});
    /*******************event handlers**********************************************/
    $("#kleur, #soort_id").change(function () {
        herlaadTabel();
    });

    function herlaadTabel() {
        var qs = $('form').serialize();
        var qsa = $('form').serializeArray();
        console.log(qs);
        console.log(qsa);
        //ajaxcall vr nieuwe gegevens vanuit sAjaxSource
        oTable.fnReloadAjax();
    }
    ;

    /*******************dataTable**********************************************/
    var oTable = $("#plantenlijst").dataTable({
        "sAjaxSource": "services/ajax_json_dt_planten.php",
        "fnServerData": function (sSource, aoData, fnCallback) {
            $.getJSON(sSource,
                    $('form').serializeArray(),
                    function (json) {
                        fnCallback(json);
                    });
        },
        "bPaginate": true,
        "bsort": false,
        "iDisplayLength": 20,
        //"iDisplayStart": 20,
        "sPaginationType": "full_numbers",
        "aLengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Alle records"]],
        "bProcessing": true,
        "aaSorting": [[6, 'asc'], [2, 'desc']],
        "aoColumnDefs": [
            {"bVisible": false, "aTargets": [5]},
            {"bSortable": false, "aTargets": [2, 6]},
            {"asSorting": ["desc"], "aTargets": [3]},
            {"bSearchable": false, "sTitle": "Rubriek", "aTargets": [6]},
            {"sTitle": "Lengte", "sWidth": "5%", "aTargets": [2]},
            {"sClass": "dt_fluo", "aTargets": [0]}
        ],
        "oLanguage": {"sUrl": "js/vendor/DataTables-1.10.11/media/js/datatables.nederlands.txt"}
    });
});//einde doc ready

function toggleZoeken(toon, $lienk, $el) {
    /* 
     @toon  1|0 setting tonen of verbergen
     @$lienk de hyperlink 
     @$el het element dat getoggled moet worden
     */


    //oude code
    //    $el.toggle('slow', function () {
    //        //als de css van het doorgegeven element op none staat dan is de tekst geavanceerd zoeken als dat niet zo is
    //        //op eenvoudig zoeken
    //        //de tekst van de link is de tekst vanuit de if
    //        tekst = ($el.css('display') == "none") ? "geavanceerd zoeken" : "eenvoudig zoeken";
    //        $lienk.text(tekst);
    //    });

    //nieuwe code
    // Als toon 1 is dan wordt adv_zoeken getoond wijzigt de tekst van de hyperlink 
    // Als toon 0 is dan wordt adv_zoeken verborgen wijzigt de tekst van de hyperlink
    var txt_een = "eenvoudig zoeken";
    var txt_adv = "geavanceerd zoeken";
    if (toon == 1) {
        $el.show('slow');
        $lienk.text(txt_een);
    }
    else if (toon == 0) {
        $el.hide('fast');
        $lienk.text(txt_adv);
    }
    else {
        throw new Error("arg toon verkeerd");
    }
}
;

