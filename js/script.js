
var renderTarget = false || document.querySelector('#render-frame')
var consoleTarget = false || document.querySelector('#console')
var timestampTarget = false || document.querySelector('#timestamp-btn')

const currentDate = () => {
    var d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();
    let s = d.getSeconds();
    let ms = d.getMilliseconds();
    h = (h < 10)? '0' + h: h;
    m = (m < 10)? '0' + m: m;
    s = (s < 10)? '0' + s: s;
    return h + ':' + m + ':' + s + ',' + ms;
}

/* Get console message (log, debug, warn and error) from default output to div */

var log = document.querySelector('#console');
//log.disabled = true;

['log','debug','info','warn','error','exception','dir', 'clear'].forEach(function (verb) {

    /* Console function overloading in current window */
    console[verb] = (function (method, verb, log) {
        return function () {
            method.apply(console, arguments);
            if(verb == "clear"){
                log.innerHTML = '';
            } else { 
                let actualContent = log.innerHTML;
                let prefix = '';
                if(timestampTarget.classList.contains("text-info")){
                    prefix = currentDate() + ": ";
                }
                log.innerHTML = prefix + Array.prototype.slice.call(arguments).join('\n&nbsp;&nbsp;') + '\n';
                log.innerHTML += actualContent;
            }

        };
    })(console[verb], verb, log);

    
    /* Console function overloading in iframe */
    renderTarget.contentWindow.window.console[verb] = (function (method, verb, log) {
        return function () {
            method.apply(console, arguments);
            
            
            if(verb == "clear"){
                log.innerHTML = '';
            } else {
                let actualContent = log.innerHTML;
                let prefix = '';
                if(timestampTarget.classList.contains("text-info")){
                    prefix = currentDate() + ": ";
                }
                log.innerHTML = prefix + Array.prototype.slice.call(arguments).join('\n') + '\n';
                log.innerHTML += actualContent;
            }

        };
    })(renderTarget.contentWindow.window.console[verb], verb, log);

});


/* Get HTML, Js and CSS code from multiple textarea to iframe */

const renderView = () => {

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

    try {
        renderTarget.contentWindow.window.eval(`${jsValue}`)
    } catch (e) {
        console.error(e.name, e.message)
    }
    
}

[].forEach.call( document.querySelectorAll('.launch'), function(el) {
    el.addEventListener('click', function() {
      renderView();
   }, false);

});


/* Erase textarea content 
*/

var erasers = document.querySelectorAll('.erase')
for(let i = 0; i < erasers.length; i++){
    erasers[i].addEventListener('click', function(event) {
        let target = false || this.getAttribute("data-target")
        let toErase = document.querySelector(target)
        
        if(toErase.nodeName == 'TEXTAREA')
            toErase.value = '';

        event.defaultPrevented;
    }); 
}
