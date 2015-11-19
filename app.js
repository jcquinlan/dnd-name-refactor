// This is a refactoring of my name generator app using object literal architecture with
// an API for secure and simple data usage

(function(){
    var name = {
        names: {
            fhm: 'james cole tyler quinn',
            lhm: 'quinlan bush kofron kender',
            fhf: 'ally clare',
            lhf: 'sheehan farrow'
        },
        init: function(){
            this.cacheDom();
            this.names.fhm = this.names.fhm.split(' ');
            this.names.lhm = this.names.lhm.split(' ');
            this.names.fhf = this.names.fhf.split(' ');
            this.names.lhf = this.names.lhf.split(' ');
            console.log('new name instance initialized.')
        },
        cacheDom: function(){
        // all the DOM elements I will need to use the app
            this.nameOne = document.getElementById('char-name').childNodes[0];
            this.nameTwo = document.getElementById('char-name').childNodes[1];
            this.roll = document.getElementById('roll')
            this.list = document.querySelector(".past-names");
        },
        utility: {
        // various general purpose functions I will use later on
            checkField: function(field){
                for(var i = 0; i < field.options.length; i++){
                    if(field.options[i].selected){
                        return field.options[i].value;
                        break;
                    }
                }
            },
            capitalize: function(word){
                return word.charAt(0).toUpperCase() + word.slice(1);
            },
            checkForClass: function(elem, cl){
                for(var i = 0; i < elem.classList.length; i++){
                    if(elem.classList[i] == cl) {
                        return true;
                        break;
                    }
                }
            },
            randomArrayElement: function(list){
                var num = Math.floor(Math.random() * list.length);
                var name = list[num];

                return name;
            }
        }
    }

    name.init();
})()




    // var firstNameList, lastNameList;
    //
    // var firstName, lastName;
    //
    // var pastNamesArray = [];
    //
    // var nameOne = document.getElementById('char-name').childNodes[0];
    // var nameTwo = document.getElementById('char-name').childNodes[1];
    // var roll = document.getElementById('roll')
    //
    // var list = document.querySelector(".past-names");
    //
    // var killKids = function(el){
    //     while(el.hasChildNodes()){
    //         list.removeChild(list.firstChild);
    //     }
    // }
    //
    // // more specific functions
    // //Adds the previous name to the ul stack of names
    // var pastNames = function(){
    //     var oldNameLi, oldName;
    //     //clear list
    //     killKids(list);
    //     if(firstName != undefined && lastName != undefined){
    //         if(pastNamesArray.length >= 5){
    //             pastNamesArray.shift();
    //         }
    //
    //         pastNamesArray.push(firstName + lastName);
    //
    //         for(var i = 0; i < pastNamesArray.length; i++){
    //             oldNameLi = document.createElement("li");
    //             oldName = document.createTextNode(pastNamesArray[(pastNamesArray.length - i) - 1]);
    //             oldNameLi.appendChild(oldName);
    //
    //             list.appendChild(oldNameLi);
    //         }
    //     }
    // }
    //
    // //adds class to lock a name and prevent it from changing
    // //set to onclick of nameOne and nameTwo in the bottom
    // var lockName = function(){
    //     if (!checkClass(this, 'locked')){
    //         this.style.opacity = .5;
    //         this.classList.add('locked');
    //     } else {
    //         this.classList.remove('locked');
    //         this.style.opacity = 1;
    //     }
    //
    // }
    //
    // //controls the animation when a new name is generated
    // var spinDie = function(){
    //     var deg;
    //     roll.style.webkitTransform === 'rotate(720deg)' ? deg = 0 : deg = 720;
    //
    //     roll.style.webkitTransform = 'rotate(' + deg + 'deg)';
    //     roll.style.mozTransform    = 'rotate(' + deg + 'deg)';
    //     roll.style.msTransform     = 'rotate(' + deg + 'deg)';
    //     roll.style.oTransform      = 'rotate(' + deg + 'deg)';
    //     roll.style.transform       = 'rotate(' + deg + 'deg)';
    // }
    //
    // //the main function that wraps everything else
    // var fillName = function(){
    //     var gender = checkField(document.customize.gender);
    //     var race = checkField(document.customize.race);
    //
    //     switch (gender) {
    //         case 'male':
    //             firstNameList = fhm;
    //             lastNameList = lhm;
    //             break;
    //         case 'female':
    //             firstNameList = fhf;
    //             lastNameList = lhf;
    //             break;
    //         case 'either':
    //             firstNameList = fhm.concat(fhf);
    //             lastNameList = lhm.concat(lhf);
    //         default:
    //             break;
    //     }
    //
    //     //Updates text nodes with new names if they are not locked
    //     //Prevents anything from updating is both names are locked
    //     if(checkClass(nameOne, 'locked') && checkClass(nameTwo, 'locked')){
    //         alert("You can't generate a new name with both names locked.");
    //     } else {
    //         //updates old names ul with previous name
    //         pastNames();
    //         spinDie();
    //
    //         if (!(checkClass(nameOne, 'locked'))){
    //             firstName = capitalize(genName(firstNameList)) + " ";
    //         }
    //         if(!(checkClass(nameTwo, 'locked'))){
    //             lastName = capitalize(genName(lastNameList));
    //         }
    //
    //         nameOne.innerText = firstName;
    //         nameTwo.innerText = lastName;
    //     }
    // }
    //
    // // Event listeners
    // roll.onclick = fillName;
    // nameOne.onclick = lockName;
    // nameTwo.onclick = lockName;
