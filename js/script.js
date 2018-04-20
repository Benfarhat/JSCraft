
var renderTarget = false || document.querySelector('#render-frame')
var consoleTarget = false || document.querySelector('#console')
var preserveTarget = false || document.querySelector('#preservelog-btn')

/* Get console message (log, debug, warn and error) from default output to div */

var log = document.querySelector('#console');
['log','debug','info','warn','error','exception','dir' ].forEach(function (verb) {
    console[verb] = (function (method, verb, log) {
        return function () {
            method.apply(console, arguments);
            log.innerHTML += Array.prototype.slice.call(arguments).join('\n') + '\n'

        };
    })(console[verb], verb, log);
});


['log','debug','info','warn','error','exception','dir' ].forEach(function (verb) {
    renderTarget.contentWindow.window.console[verb] = (function (method, verb, log) {
        return function () {
            method.apply(console, arguments);
            log.innerHTML += Array.prototype.slice.call(arguments).join('\n') + '\n'

        };
    })(renderTarget.contentWindow.window.console[verb], verb, log);
});

/* Get HTML, Js and CSS code from multiple textarea to iframe */

const renderView = () => {
    console.log("Rendering ...")
    if(preserveTarget && !preserveTarget.classList.contains("bg-primary")){
        //consoleTarget.innerHTML = ""
    }

    let Iframe = renderTarget.contentWindow ||
    renderTarget.contentDocument.document ||
    renderTarget.contentDocument;

    let htmlValue = document.querySelector('#htmleditor').value;
    let cssValue = document.querySelector('#csseditor').value;
    let jsValue = document.querySelector('#jseditor').value;

    renderTarget.contentWindow.document.head.innerHTML = `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>JSCraft</title>
    <style>
    ${cssValue}
    </style>
    `;


    renderTarget.contentWindow.document.body.innerHTML = `
    ${htmlValue}
    <script>
    ${jsValue}
    </script>
    `;

    
    let previewScript = renderTarget.contentWindow.document.createElement('script');
    previewScript.src = "http://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js";

    renderTarget.contentWindow.window.eval(`${jsValue}`)
}

[].forEach.call( document.querySelectorAll('.launch'), function(el) {
    el.addEventListener('click', function() {
      renderView();
   }, false);

});


/*

@todo
should we use postMessage:

https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage

*/