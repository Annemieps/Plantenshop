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
        //var _active met de waarde false zal de 'state' van animatie bijhouden: is 
        //de animatie nog bezig of is hij gedaan
        _active: false,
        //de var _destroyCalled met de waarde false zal de bijhouden of de method 
        //destroy geroepen werd en uitgevoerd is
        _destroyCalled: false,
        _create: function () {
            //initialisatie van de widget
            //this.element bevat het figure element als JQset
            this.element.img = $('img', this.element);
            this.element.cap = $('figcaption', this.element);
            var o = this.options;
            //console.log (this.element[0].nodeName);

            //vaste eigenschappen
            this.element.css({position: 'relative', height: '100px'});
            this.element.cap
                    .hide()
                    .css({
                        position: 'absolute',
                        left: 0,
                        width: this.element.img.width() - (o.padding * 2),
                        height: '80px',
                        opacity: '0.7',
                        padding: o.padding
                    });
            this._CSStoepassen();
            //hover event handler voor het element
            this._setMouseHandler();
        },
        _CSStoepassen: function () {
            //alle aanpasbare eigenschappen hier
            this.element.cap.css({
                color: this.options.color,
                backgroundColor: this.options.bgColor
            });
            //location speciaal
            switch (this.options.location) {
                case "top":
                    this.element.cap.css({top: 0});
                    break;
                case "bottom":
                    this.element.cap.css({bottom: 0});
                    break;
                default:
                    this.element.cap.css({top: 0});
                    break;
            }
        },
        _setMouseHandler: function () {
            //hover event handler
            var self = this;
            var o = self.options;
            self.element.hover(
                    function () {
                        //in de eerste event handler van hover(), 
                        //de mouseenter event handler, 
                        //plaatsen we als eerste statement de var _active op true
                        self._active = true;
                        self.element.cap.show("slide", {direction: "left"}, o.speed, function () {
                        });
                    },
                    function () {
                        // mouseleave event handler, in de callback functie, plaatsen we 
                        // dezelfde var weer op false en checken de waarde van 
                        // _destroyCalled: als deze true is, zal de widget niet vernietigd 
                        // zijn en moet dat nog gebeuren. 
                        self.element.cap.hide('slide', {direction: "right"}, o.speed, function () {
                            self._active = false;
                            if (self._destroyCalled == true)
                                self._vernietig();
                        });
                    }
            );
        },
        enable: function () {
            $.Widget.prototype.enable.apply(this, arguments);
            this._setMouseHandler();
        },
        disable: function () {
            $.Widget.prototype.disable.apply(this, arguments);
            this._removeMouseHandler();
        },
        _removeMouseHandler: function () {
            //hover event handler infeite twee handlers bevat, moeten we er 
            //ook twee verwijderen: unbind op het element, koppelt mouseenter en
            //mouseleave los 
            this.element.unbind('mouseenter mouseleave');
        },
        _setOption: function (option, value) {
            // hier voeren we de default actie van _setOption eerst uit  
            // via het prototype van de widget
            $.Widget.prototype._setOption.apply(this, arguments);

            //voeren we _CSStoepassen() opnieuw uit om de gewijzigde 
            // eigenschap toe te passen
            this._CSStoepassen();
        },
        destroy: function () {
            this._destroyCalled = true;
            if(this._active == false){
                this._vernietig();
                this._destroyCalled = false; 
            }
        },
        _vernietig: function () {
            // call the base destroy function
            //verwijdert de instantie van de widget van ons element
            $.Widget.prototype.destroy.call(this, arguments);
            //verwijderen we de mouse handlers
            this._removeMouseHandler();
            this.element.css({height: '180px'});
            this.element.cap
                .css({
                    position: 'static',
                    width: 'auto',
                    height: 'auto',
                    color: 'inherit',
                    backgroundColor: 'inherit',
                    opacity: '1',
                    padding: 0
                })
                .show();
        }
    }); //einde widget
})(jQuery);