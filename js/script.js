/* TODO 

No js framework for source

possibility to let user use his prefered framework (prepare a list of cdn)

Pour la console comment récupérer les messages de l'iframe et les afficher en local

*/
(function () {
    if (!console) {
        console = {};
    }
    var old = console.log;
    var logger = document.getElementById('console');
    console.log = function (message) {
        if (typeof message == 'object') {
            logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(message) : String(message)) + '<br />';
        } else {
            logger.innerHTML += message + '<br />';
        }
    }
})();


(function ($) {
    function launchCode() {

        $('#render-frame').contents().find('head').html('');
        $('#render-frame').contents().find('body').html('');

        var cssValue = $('#csseditor').val();
        var htmlValue = $('#htmleditor').val();
        var jsValue = $('#jseditor').val();

        var styleValue = "<style>" + cssValue + "<\/style>";
        var scriptValue = "<script>" + jsValue + "<\/script>";
        var jqueryfornow = '<script src="https:\/\/ajax.googleapis.com\/ajax\/libs\/jquery\/1.11.3\/jquery.min.js"><\/script>';

        var head = $("#render-frame").contents().find("head");
        var content = $("#render-frame").contents().find("body");

        head.append(styleValue);
        content.prepend(htmlValue);
        content.append(jqueryfornow);
        content.append(scriptValue);
    }

    $('#render-frame').ready(launchCode);
    $('.launch').click(launchCode);

}(jQuery));