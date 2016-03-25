$(function () {
    $("#regForm").submit(function (e) {
        e.preventDefault();
    });

    //regex voor het controleren van wachtwoord
    $.validator.addMethod("wwCheck", function (value, element) {
        return value.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/);
    });

    //promo div. click als het checked is dan moet disabled verwijderd worden en moet er focus komen
    //anders moet het veld disabled blijven en zonder waarde
    $('#promos').click(function () {
        if ($(this).is(':checked')) {
            $('#email').removeAttr('disabled')[0].focus();
        } else {
            $('#email').attr('disabled', true).val("");
        }
    });
    var $foutBoksen = $('div.foutBox');

    $("#regForm").validate({
        // In rules zullen we - opnieuw onder de vorm van een properties object - voor
        // elke formcontrol die we willen beveiligen de validatieregel vermelden.
        debug: true,
        rules: {
            vnaam: "required",
            fnaam: "required",
            username: {
                required: true,
                minlength: 5
            },
            postnr: {
                required: true,
                digits: true,
                minlength: 4,
                maxlength: 4
            },
            geboren: {
                required: true,
                dateISO: true
            },
            sexe: "required",
            "ruimte[]": "required",
            "soort_id[]": {
                required: true,
                rangelength: [1, 4]
            },
            username:{
                required: true,
                minlength: 8
            },
            ww1: {
                wwCheck: true
            },
            ww2: {
                equalTo: "#ww1"
            },
            email: {
                required: "#promos:checked",
                email: true
            }

        },
        messages: {
            vnaam: "voornaam is verplicht",
            username: "Username is verplicht",
            fnaam: "Familienaam is verplicht",
            postnr: {
                required: "de postcode is verplicht",
                digits: "een postcode bestaat enkel uit getallen",
                minlength: "een postcodenummer bestaat uit exact 4 getallen",
                maxlength: "een postcodenummer bestaat uit exact 4 getallen"
            },
            geboren: {
                required: "Geef uw geboortedatum in, aub",
                dateISO: "de datum moet het formaat YYYY-MM-DD hebben"
            },
            sexe: "kies uw geslacht",
            "ruimte[]": "kies minstens &eacute;&eacute;n optie",
            "soort_id[]": "kies minstens &eacute;&eacute;n soort maar niet meer dan 4",
            username:"uw gebruikersnaam is verplicht en moet minimum 8 karakters hebben",
                    ww1: "het wachtwoord moet min 8 karakters lang zijn en moet minstens &eacute;&eacute;nkleine letter, 1 Hoofdletter, 1 getal en, 1 speciaal karakter (@#$%^&+=) bevatten",
            email: {
                required: "Een emailadres is nodig om u te kunnen contacteren",
                email: "het emailadres is ongeldig"
            }

        },
//        errorPlacement: function (error, element) {
//            var $ctrlbx = element.parents("div.controlbox");
//
//            if ($ctrlbx.length != 0) {
//                error.insertAfter($ctrlbx);
//            }
//            else {
//                error.insertAfter(element);
//            }

//        },
        errorContainer: $foutBoksen,
        errorLabelContainer: $("ul", $foutBoksen),
        wrapper: "li",



        /*de submitHandler value  is een functie waar we de normale submit van
         het formulier oproepen, je kan hier ook andere dingen doen die je wil 
         uitvoeren bij een succesvolle submit*/
        submitHandler: function (form) {
            form.submit();
        }
    }); //einde validator
    $(function () {
        $.datepicker.setDefaults($.datepicker.regional['nl-BE']);

        $("#geboren").datepicker({
            dateFormat: "yy-mm-dd",
            yearRange: '-80:+00',
            changeMonth: true,
            changeYear: true
        });
    });


}); //einde doc.ready 
 