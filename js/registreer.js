$(function () {
    $("#regForm").validate({
        // In rules zullen we - opnieuw onder de vorm van een properties object - voor
        // elke formcontrol die we willen beveiligen de validatieregel vermelden.
        rules: {
            vnaam: "required",
            username: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            vnaam: "voornaam is verplicht"
        },
        /*de submitHandler value  is een functie waar we de normale submit van
         het formulier oproepen, je kan hier ook andere dingen doen die je wil 
         uitvoeren bij een succesvolle submit*/
        submitHandler: function (form) {
            form.submit();
        }
    }); //einde validator
}); //einde doc.ready 
 