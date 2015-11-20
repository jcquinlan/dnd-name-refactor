// This is a refactoring of my name generator app using object literal architecture
(function(){
    var utility = {
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
        },
        killKids: function(el){
            while(el.hasChildNodes()){
                el.removeChild(el.firstChild);
            }
        }
    };


    var name = {
        names: {
            human: {
                m: 'Anlow, Arando, Bram, Cale, Dalkon, Daylen, Dodd, Dungarth, Dyrk, Eandro, Falken, Feck, Fenton, Gryphero, Hagar, Jeras, Krynt, Lavant, Leyten, Madian, Malfier, Markus, Meklan, Namen, Navaren, Nerle, Nilus, Ningyan, Norris, Quentin, Semil, Sevenson, Steveren, Talfen, Tamond, Taran, Tavon, Tegan, Vanan, Vincent',
                f: 'Arkalis, Armanci, Bilger, Blackstrand, Brightwater, Carnavon, Caskajaro, Coldshore, Coyle, Cresthill, Cuttlescar, Daargen, Dalicarlia, Danamark, Donoghan, Drumwind, Dunhall, Ereghast, Falck, Fallenbridge, Faringray, Fletcher, Fryft, Goldrudder, Grantham, Graylock, Gullscream, Hindergrass, Iscalon, Kreel, Kroft, Lamoth, Leerstrom, Lynchfield, Moonridge, Netheridge, Oakenheart, Pyncion, Ratley, Redraven, Revenmar, Roxley, Sell, Seratolva, Shanks, Shattermast, Shaulfer, Silvergraft, Stavenger, Stormchapel, Strong, Swiller, Talandro , Targana, Towerfall, Umbermoor, Van Devries, Van Gandt, Van Hyden, Varcona, Varzand, Voortham, Vrye, Webb, Welfer, Wilxes, Wintermere, Wygarthe, Zatchet, Zethergyll',
                l: 'Azura, Brey, Hallan, Kasaki, Lorelei, Mirabel, Pharana, Remora, Rosalyn, Sachil, Saidi, Tanika, Tura, Tylsa, Vencia, Xandrilla',
            },
            elf: {
                m: 'Alarcion, Alathar, Ariandar, Arromar, Borel, Bvachan, Carydion, Elgoth, Farlien, Ferel, Gaerlan, Iafalior, Kaelthorn, Laethan, Leliar, Leodor, Lorak, Lorifir, Morian, Oleran, Rylef, Savian, Seylas, Tevior, Veyas',
                f: 'Aryllan, Atalya, Ayrthwil, Irva, Lyfalia, Ronefel, Thirya, Velene, Venefiq, Zereni',
                l: 'Autumnloft, Balefrost, Briarfell, Evenwind, Graytrails, Mooncairn, Riverwall, Stormwolf, Summergale, Sunshadow, Woodenhawk'
            },
            dwarf: {},
            gnome: {},
            tielfing: {}
        },
        init: function(){
            this.names.human.m = this.names.human.m.split(', ');
            this.names.human.f = this.names.human.f.split(', ');
            this.names.human.l = this.names.human.l.split(', ');
            this.names.elf.m = this.names.elf.m.split(', ');
            this.names.elf.f = this.names.elf.f.split(', ');
            this.names.elf.l = this.names.elf.l.split(', ');
            this.pastNames = [];
            this.cacheDom();
            this.bindEvents();
            console.log('new name instance initialized.')
        },
        cacheDom: function(){
        // all the DOM elements I will need to use the app
            this.nameOne = document.getElementById('char-name').childNodes[0];
            this.nameTwo = document.getElementById('char-name').childNodes[1];
            this.roll = document.getElementById('roll');
            this.list = document.querySelector(".past-names");
            this.gender = document.customize.gender;
            this.race = document.customize.race;
        },
        bindEvents: function(){
            this.roll.onclick = this.render.bind(this);
            this.nameOne.onclick = this.lockName;
            this.nameTwo.onclick = this.lockName;
        },
        spinDie: function(){
            var deg;
            this.roll.style.webkitTransform === 'rotate(720deg)' ? deg = 0 : deg = 720;
            this.roll.style.webkitTransform = 'rotate(' + deg + 'deg)';
            this.roll.style.mozTransform    = 'rotate(' + deg + 'deg)';
            this.roll.style.msTransform     = 'rotate(' + deg + 'deg)';
            this.roll.style.oTransform      = 'rotate(' + deg + 'deg)';
            this.roll.style.transform       = 'rotate(' + deg + 'deg)';
        },
        lockName: function(){
            if (!utility.checkForClass(this, 'locked')){
                this.style.opacity = .5;
                this.classList.add('locked');
            } else {
                this.classList.remove('locked');
                this.style.opacity = 1;
            }
        },
        generateNames: function(){
            var firstNameList, lastNameList;

            switch (utility.checkField(this.gender)) {
                case 'male':
                    firstNameList = this.names[utility.checkField(this.race)].m;
                    lastNameList = this.names[utility.checkField(this.race)].l;
                    break;
                case 'female':
                    firstNameList = this.names[utility.checkField(this.race)].f;
                    lastNameList = this.names[utility.checkField(this.race)].l;
                    break;
                case 'either':
                    firstNameList = this.names[utility.checkField(this.race)].m.concat(this.names[utility.checkField(this.race)].f);
                    lastNameList = this.names[utility.checkField(this.race)].l;
                default:
                    break;
                }
            this.firstName = utility.randomArrayElement(firstNameList);
            this.lastName = utility.randomArrayElement(lastNameList);
        },
        fillPastNames: function(){
            console.log(this.pastNames);
            utility.killKids(this.list);
            if(this.firstName != undefined && this.lastName != undefined){
                if(this.pastNames.length >= 5){
                    this.pastNames.shift();
                }

                this.pastNames.push(utility.capitalize(this.nameOne.innerText) + ' ' + utility.capitalize(this.nameTwo.innerText));
                for(var i = 0; i < this.pastNames.length; i++){
                    var oldNameLi = document.createElement("li");
                    var oldName = document.createTextNode(this.pastNames[(this.pastNames.length - i) - 1]);
                    oldNameLi.appendChild(oldName);
                    this.list.appendChild(oldNameLi);
                }
            }
        },
        render: function(){
            if(utility.checkForClass(this.nameOne, 'locked') && utility.checkForClass(this.nameTwo, 'locked')){
                alert('You cannot generate a new name with both names locked.');
            } else {
                this.spinDie();
                this.fillPastNames();
                this.generateNames();

                if(!utility.checkForClass(this.nameOne, 'locked')){
                    this.nameOne.innerText = utility.capitalize(this.firstName + ' ');
                };

                if(!utility.checkForClass(this.nameTwo, 'locked')){
                    this.nameTwo.innerText = utility.capitalize(this.lastName);
                };
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
