// JavaScript Document
// KNIPOOG, widget om het figcaption element van figure element dynamisch te tonen
// maakt gebruik van de widget factory
(function ($) {
    $.widget("ui.knipoog", {
        options: {
            location: "top",
            color: "black",
            bgColor: "silver",
            speed: "slow",
            padding: 4
        },
        
        _create: function () {
        //initialisatie van de widget
        //this.element bevat het figure element als JQset
            this.element.img = $('img', this.element);
            this.element.cap = $('figcaption', this.element);
            var o = this.options;
            console.log(this.element[0].nodeName);
        }
    }); //einde widget
})(jQuery);