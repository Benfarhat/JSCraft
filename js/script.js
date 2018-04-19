jQuery.noConflict();

/* Get console message (log, debug, warn and error) from default output to div */

var log = document.querySelector('#console');
['log','debug','info','warn','error'].forEach(function (verb) {
    console[verb] = (function (method, verb, log) {
        return function () {
            method.apply(console, arguments);
            log.innerHTML += Array.prototype.slice.call(arguments).join('\n') + '\n'

        };
    })(console[verb], verb, log);
});

/* Get HTML, Js and CSS code from multiple textarea to iframe */

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

