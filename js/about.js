// JavaScript Document
// JS bestand voor About pagina

// JavaScript Document

$(function () {
//   alert( 
//           $('a')
//            .addClass('rood')
//            .filter('a[target]').addClass('groen').end()
//            .addClass('onderlijnd').length
//    );

    $('tbody tr:odd').addClass('oneven');
    $('tbody tr:even').addClass('even');

    $('a[href^="http"]').on('click', function () {
        alert('U staat op het punt de pagina te verlaten');
    });

    $('<a href="#about"title="terug nr boven">terug nr boven</a>')
            .insertBefore(':header:gt(2)')
            .button({icons: {secondary: 'ui-icon-circle-triangle-n'}});

    var lijst = ['roger', 'evelyn', 'hilde', 'jan'];
    //nieuwe ul
    var $uul = $('<ul>');
    var strDeLijst = '';
    //voor elke lijst functie n, waarde is strdelijst li plus waarde
    $.each(lijst, function (n, value) {
        strDeLijst += '<li>' + value + '</li>';
    });
    //de html van de uul is de lijst
    $uul.html(strDeLijst);
    //na team word de uul ingestoken.
    $('#team').after($uul);

    // versie vr JSONgegevens
    var $container = $('<div id="teamboks">');
    var $diefrechts = $('<div id="teamgegevens">');
    var $keuzelijst = $('<select id="teamkeuzelijst">');
    var strDeOptions = '<option value="">--- het team ---</option>';
    $.each(lijst, function (n, value) {
        strDeOptions += '<option>' + value + '</option>';
    })
    $keuzelijst.html(strDeOptions);
    $container.append($keuzelijst).prepend($diefrechts);
    $('#team').after($container);
});//einde doc.ready


var walkTree = function (root, $list, enter, exit)
{
    var node = root;
    start: while (node) {

        $list = enter(node, $list);
        if (node.firstChild) {
            node = node.firstChild;
            continue start;
        }
        while (node) {
            $list = exit(node, $list);
            if (node.nextSibling) {
                node = node.nextSibling;
                continue start;
            }
            if (node == root)
                node = null;
            else
                node = node.parentNode;
        }
    }
    return $list;
}
