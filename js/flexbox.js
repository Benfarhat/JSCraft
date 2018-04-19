/* Collapsible élement 
Just add class="closuere" and a data-target that point to the element(s) you want to hide/show
*/
var closures = document.querySelectorAll('.closure')
for(let i = 0; i < closures.length; i++){
   closures[i].addEventListener('click', function(event) {
        let target = false || this.getAttribute("data-target")
        let expand = false || this.getAttribute("data-expand")
        let className = false || this.getAttribute("data-expand-class")

        if(target){   
            if (document.querySelector(target).style.display == "none"){
                document.querySelector(target).style.display = "block";
                if(expand && className){
                    let element = false || document.querySelector(expand)
                    if(element){
                        element.classList.remove(className);
                    }
                }
            } else {
                document.querySelector(target).style.display = "none";
                if(expand && className){
                    let element =  false || document.querySelector(expand)
                    if(element){
                        element.classList.add(className);
                    }
                }
            }
        }

        event.defaultPrevented;
    }); 
}

/* Add  Remove Class => Sort of toggle
You can for example change order propertie of an item 
*/

var modifiers = document.querySelectorAll('.modifier')
for(let i = 0; i < modifiers.length; i++){
   modifiers[i].addEventListener('click', function(event) {
        let target = false || this.getAttribute("data-target")
        let className = false || this.getAttribute("data-target-class")

        if(target && className){ 
            let element = false || document.querySelector(target)
            if (element.classList.contains(className)){
                element.classList.remove(className);
            } else {
                element.classList.add(className);
            }
            /* or simply:
            element.classList.toggle(className);
            */
        }

        event.defaultPrevented;
    }); 
}

/* Add / Remove Class No toggle */

var modifiers = document.querySelectorAll('.addremove')
for(let i = 0; i < modifiers.length; i++){
   modifiers[i].addEventListener('click', function(event) {
        let target = false || this.getAttribute("data-target")
        let addClassName = false || this.getAttribute("data-add-class")
        let removeClassName = false || this.getAttribute("data-remove-class")

        if((target && addClassName) || (target && removeClassName)){ 
            let element = false || document.querySelector(target)
            if(element){            
                if (addClassName && !element.classList.contains(addClassName)){
                    element.classList.add(addClassName);
                } 
                if (removeClassName && element.classList.contains(removeClassName)){
                    element.classList.remove(removeClassName);
                } 
            }
        }

        event.defaultPrevented;
    }); 
}