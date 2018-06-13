/*  Author: Andrew Givens
**  Date: 5/2/2018
**  Notes:  Adding javascript to dynamically create the html form. This will allow for easier editing in the future.
**          Adding jquery functionality for bootstrap components
*/

// these will be any single textfield rows to appear at the top of the form
const playerInfo = ['ESO-Username', 'Level'];
const setName = "Set-Name";

// armour rows that include the Armour Type, Trait, and Enchantment dropdowns
const armourPieces = ['Head', 'Shoulders', 'Chest', 'Legs', 'Waist', 'Hands', 'Feet'];
const armourTypes = ['Light', 'Medium', 'Heavy'];
const armourTraits = ['Divines', 'Impenetrable', 'Infused', 'Nirnhoned', 'Prosperous', 'Reinforced', 'Sturdy', 'Training', 'Well Fitted'];
const armourEnchant = ['Health', 'Magicka', 'Stamina', 'Prismatic Defense'];
const armourOptionLabels = ['Armour Type', 'Trait', 'Enchantment'];

// Weapon Data
const weaponSlots = ['Primary', 'Secondary'];
const weaponOptionLabels = ['Weapon Type', 'Trait', 'Enchantment'];
const primaryWeaponTypes = ['Axe', 'Mace', 'Sword', 'Battle Axe', 'Maul', 'Greatsword', 'Dagger', 'Bow', 'Inferno Staff',
                            'Frost Staff', 'Lightning Staff', 'Restoration Staff'];
var secondaryWeaponTypes = ['Axe', 'Mace', 'Sword', 'Dagger', 'Shield'];
const weaponTraits = ['Charged', 'Defending', 'Infused', 'Nirnhoned', 'Powered', 'Precise', 'Sharpened', 'Training', 'Weighted'];
const weaponEnchant = ['Flame', 'Frost', 'Shock', 'Poison', 'Foulness', 'Decrease Health', 'Hardening', 'Absorb Health',
                       'Absorb Magika', 'Absorb Stamina', 'Weapon Damage', 'Weakening', 'Crushing', 'Prismatic Onslaught'];

function createSetNameTextbox(rowName){
    var setNameInputGroup = document.createElement('div');
    setNameInputGroup.setAttribute('class', 'input-group mb-3 col-2');
    setNameInputGroup.setAttribute('id', `${rowName}-setName`);
    setNameInputGroup.setAttribute('style', 'padding-left:30px;');

    var prepend = document.createElement('div');
    prepend.setAttribute('class', 'input-group-prepend');
    prepend.setAttribute('style', 'justify-content:center;');
    var prependText = document.createElement('span');
    prependText.setAttribute('class', 'input-group-text');
    prependText.setAttribute('id', 'inputGroup-sizing-default');
    prependText.innerHTML = setName;
    prepend.appendChild(prependText);
    setNameInputGroup.appendChild(prepend);

    var input = document.createElement('input');
    input.setAttribute('id', `${rowName}-${setName}-input`);
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'form-control');
    input.setAttribute('aria-label', 'Default');
    input.setAttribute('aria-describedby', 'inputGroup-sizing-default');
    setNameInputGroup.appendChild(input);

    return setNameInputGroup;
}

function createDropdown(piece, dropdownLabel, optionsArr, opt1, opt2, opt3){
    var labelNoSpace = dropdownLabel.replace('\s', '');

    var dropdownDiv = document.createElement('div');
    dropdownDiv.setAttribute('id', `${piece}-${labelNoSpace}-Dropdown-Div`);
    dropdownDiv.setAttribute('class', 'col-sm-2');
    var dropdownToggle = document.createElement('button');
    dropdownToggle.setAttribute('class', 'btn btn-secondary dropdown-toggle');
    dropdownToggle.setAttribute('type', 'button');
    dropdownToggle.setAttribute('id', `${piece}-${labelNoSpace}-Dropdown`);
    dropdownToggle.setAttribute('data-toggle', "dropdown");
    dropdownToggle.setAttribute('aria-haspopup', 'true');
    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownToggle.innerHTML = dropdownLabel;
    dropdownDiv.appendChild(dropdownToggle);

    var dropdownMenu = document.createElement('div');
    dropdownMenu.setAttribute('class', 'dropdown-menu')
    dropdownMenu.setAttribute('id', `${piece}-${labelNoSpace}-dropdown-menu`);
    dropdownMenu.setAttribute('aria-labelledby', `${piece}-${labelNoSpace}-Dropdown`);

    switch(dropdownLabel){
        case optionsArr[0]:
            var dropdownItems = opt1;
            break;
        case optionsArr[1]:
            var dropdownItems = opt2;
            break;
        case optionsArr[2]:
            var dropdownItems = opt3;
            break;
        default:
            var dropdownItems = ['None'];
    }

    dropdownItems.forEach(function(type){
        var option = document.createElement('button');
        option.setAttribute('class', 'dropdown-item');
        option.setAttribute('type', 'button');
        option.setAttribute('data-id', `${piece}-${labelNoSpace}`);
        option.setAttribute('value', type);
        option.innerHTML = type;
        dropdownMenu.appendChild(option);
    });
    dropdownDiv.appendChild(dropdownMenu);

    return dropdownDiv;
}

function createDropdownClick() {
    $('.dropdown-item').unbind();
    $('.dropdown-item').click(function(){
        var dropdownId = $(this).attr('data-id');

        document.getElementById(`${dropdownId}-Dropdown`).innerHTML = this.value;
        if(dropdownId == "Primary0-Weapon Type"){
            if(!secondaryWeaponTypes.includes(this.value)){
                document.getElementById('Secondary0-label').setAttribute('class', 'btn btn-danger col-sm-1');
                $("div[id^=Secondary0]").children().attr('disabled', true);
            }
            else {
                document.getElementById('Secondary0-label').setAttribute('class', 'btn btn-success col-sm-1');
                $("div[id^=Secondary0]").children().attr('disabled', false);
            }
        }
        if(dropdownId == "Primary1-Weapon Type"){
            if(!secondaryWeaponTypes.includes(this.value)){
                document.getElementById('Secondary1-label').setAttribute('class', 'btn btn-danger col-sm-1');
                $("div[id^=Secondary1]").children().attr('disabled', true);
            }
            else {
                document.getElementById('Secondary1-label').setAttribute('class', 'btn btn-success col-sm-1');
                $("div[id^=Secondary1]").children().attr('disabled', false);
            }
        }
        if(dropdownId == "Secondary0-Weapon Type" && this.value == "Shield"){
            switchDropdownMenu('Secondary0-Trait-dropdown-menu', armourTraits);
            switchDropdownMenu('Secondary0-Enchantment-dropdown-menu', armourEnchant);
        }
        else if(dropdownId == "Secondary0-Weapon Type"){
            switchDropdownMenu('Secondary0-Trait-dropdown-menu', weaponTraits);
            switchDropdownMenu('Secondary0-Enchantment-dropdown-menu', weaponEnchant);
        }

        if(dropdownId == "Secondary1-Weapon Type" && this.value == "Shield"){
            switchDropdownMenu('Secondary1-Trait-dropdown-menu', armourTraits);
            switchDropdownMenu('Secondary1-Enchantment-dropdown-menu', armourEnchant);
        }
        else if(dropdownId == "Secondary1-Weapon Type"){
            switchDropdownMenu('Secondary1-Trait-dropdown-menu', weaponTraits);
            switchDropdownMenu('Secondary1-Enchantment-dropdown-menu', weaponEnchant);
        }
    });
}

function switchDropdownMenu(divID, newItems) {
    var dropdownMenu = document.getElementById(divID);
    var dataID = dropdownMenu.children[0].getAttribute('data-id');
    dropdownMenu.innerHTML = '';

    newItems.forEach(function(type){
        var option = document.createElement('button');
        option.setAttribute('class', 'dropdown-item');
        option.setAttribute('type', 'button');
        option.setAttribute('data-id', dataID);
        option.setAttribute('value', type);
        option.innerHTML = type;
        dropdownMenu.appendChild(option);
    });

    createDropdownClick();
}

// creates the form on page load
$(document).ready(function() {
    var form = document.getElementById('form-body');
    form.appendChild(document.createElement('br'));

    // player info
    playerInfo.forEach(function(rowLabel){
        var span = document.createElement('span');
        span.setAttribute('class', 'form-group row');
        span.setAttribute('style', 'justify-content:center;');

        var inputGroup = document.createElement('div');
        if(rowLabel == playerInfo[0]) {
            inputGroup.setAttribute('class', 'input-group mb-3 col-4');
        }
        else if(rowLabel == playerInfo[1]) {
            inputGroup.setAttribute('class', 'input-group mb-3 col-2');
        }


        var prepend = document.createElement('div');
        prepend.setAttribute('class', 'input-group-prepend');
        prepend.setAttribute('style', 'justify-content:center;');
        var prependText = document.createElement('span');
        prependText.setAttribute('class', 'input-group-text');
        prependText.setAttribute('id', 'inputGroup-sizing-default');
        prependText.innerHTML = rowLabel;
        prepend.appendChild(prependText);
        inputGroup.appendChild(prepend);

        var input = document.createElement('input');
        input.setAttribute('id', `${rowLabel}-input`);
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'form-control');
        input.setAttribute('aria-label', 'Default');
        input.setAttribute('aria-describedby', 'inputGroup-sizing-default');
        inputGroup.appendChild(input);
        span.appendChild(inputGroup);

        if(rowLabel == playerInfo[1]){
            span.appendChild(createDropdown('all', 'Quality', ['Quality'], ['Normal', 'Fine', 'Superior', 'Epic', 'Legendary'], [], []));
        }
        form.appendChild(span);
    });

    // armour options
    var header = document.createElement('h2');
    header.setAttribute('class', 'form-group-row');
    header.setAttribute('style', 'justify-content:center; padding:30px');
    header.innerHTML = "Armour";
    form.appendChild(header);

    armourPieces.forEach(function(piece){
        var span = document.createElement('span');
        span.setAttribute('class', 'form-group row');
        span.setAttribute('id', `${piece}-row`);
        span.setAttribute('style', 'justify-content:center;');

        var label = document.createElement('button');
        label.setAttribute('class', 'btn btn-success col-sm-1');
        label.setAttribute('id', `${piece}-label`);
        label.setAttribute('type', 'button');
        label.innerHTML = piece;
        span.appendChild(label);

        armourOptionLabels.forEach(function(dropdownLabel){
            var labelNoSpace = dropdownLabel.replace('\s', '');

            var dropdownDiv = createDropdown(piece, dropdownLabel, armourOptionLabels, armourTypes, armourTraits, armourEnchant);
            span.appendChild(dropdownDiv);
        });
        span.appendChild(createSetNameTextbox(piece));

        form.appendChild(span);
    });

    // weapon options
    var header = document.createElement('h2');
    header.setAttribute('class', 'form-group-row');
    header.setAttribute('style', 'justify-content:center; padding:30px');
    header.innerHTML = "Weapons";
    form.appendChild(header);

    for(var i = 0; i < 2; i++){
        weaponSlots.forEach(function(weaponSlot){
            var span = document.createElement('span');
            span.setAttribute('class', 'form-group row');
            span.setAttribute('id', `${weaponSlot}${i}-row`);
            span.setAttribute('style', 'justify-content:center;');

            var label = document.createElement('button');
            label.setAttribute('class', 'btn btn-success col-sm-1');
            label.setAttribute('id', `${weaponSlot}${i}-label`);
            label.setAttribute('type', 'button');
            label.innerHTML = weaponSlot;
            span.appendChild(label);

            switch(weaponSlot){
                case weaponSlots[0]:
                    var weapons = primaryWeaponTypes;
                    break;
                case weaponSlots[1]:
                    var weapons = secondaryWeaponTypes;
                    break;
                default:
                    var weapons = ['none'];
                    break;
            }
            weaponOptionLabels.forEach(function(dropdownLabel){
                var labelNoSpace = dropdownLabel.replace('\s', '');
                var weaponSlotDrop = weaponSlot + i.toString();

                dropdownDiv = createDropdown(weaponSlotDrop, dropdownLabel, weaponOptionLabels, weapons, weaponTraits, weaponEnchant);
                span.appendChild(dropdownDiv);

            });
            span.appendChild(createSetNameTextbox(weaponSlot + i.toString()));
            form.appendChild(span);
        });
    }

    // Click functions
    createDropdownClick();

    $("button[id$='-label']").click(function(){
        var rowName = this.id;
        rowName = rowName.substring(0, rowName.indexOf('-'));

        if(this.className == 'btn btn-success col-sm-1'){
            this.setAttribute('class', 'btn btn-danger col-sm-1');
            $("div[id^="+rowName+"]").children().attr('disabled', true);
        }
        else {
            this.setAttribute('class', 'btn btn-success col-sm-1');
            $("div[id^="+rowName+"]").children().attr('disabled', false);
        }
    });

    $('#Submit-Btn').click(()=>{
        var webhook = "https://discordapp.com/api/webhooks/444376028375285766/kzg-67tlzb2r2umWFo78NQEgjuxpLYKXW2uPzbVS5TzN9AUpYcQdaFxDpeR0nQYKnA5w";
        var username = $("#ESO-Username-input").val();
        var head = {
            'type':document.getElementById("Head-Armour Type-Dropdown").innerHTML,
            'trait':document.getElementById("Head-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Head-Enchantment-Dropdown").innerHTML,
            'set':$("#Head-Set-Name-input").val()
        }
        var shoulders = {
            'type':document.getElementById("Shoulders-Armour Type-Dropdown").innerHTML,
            'trait':document.getElementById("Shoulders-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Shoulders-Enchantment-Dropdown").innerHTML,
            'set':$("#Shoulders-Set-Name-input").val()
        }
        var chest = {
            'type':document.getElementById("Chest-Armour Type-Dropdown").innerHTML,
            'trait':document.getElementById("Chest-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Chest-Enchantment-Dropdown").innerHTML,
            'set':$("#Chest-Set-Name-input").val()
        }
        var legs = {
            'type':document.getElementById("Legs-Armour Type-Dropdown").innerHTML,
            'trait':document.getElementById("Legs-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Legs-Enchantment-Dropdown").innerHTML,
            'set':$("#Legs-Set-Name-input").val()
        }
        var waist = {
            'type':document.getElementById("Waist-Armour Type-Dropdown").innerHTML,
            'trait':document.getElementById("Waist-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Waist-Enchantment-Dropdown").innerHTML,
            'set':$("#Waist-Set-Name-input").val()
        }
        var hands = {
            'type':document.getElementById("Hands-Armour Type-Dropdown").innerHTML,
            'trait':document.getElementById("Hands-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Hands-Enchantment-Dropdown").innerHTML,
            'set':$("#Hands-Set-Name-input").val()
        }
        var feet = {
            'type':document.getElementById("Feet-Armour Type-Dropdown").innerHTML,
            'trait':document.getElementById("Feet-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Feet-Enchantment-Dropdown").innerHTML,
            'set':$("#Feet-Set-Name-input").val()
        }
        var weapon1 = {
            'type':document.getElementById("Primary-Weapon Type-Dropdown").innerHTML,
            'trait':document.getElementById("Primary-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Primary-Enchantment-Dropdown").innerHTML,
            'set':$("#Primary-Set-Name-input").val()
        }
        var weapon2 = {
            'type':document.getElementById("Secondary-Weapon Type-Dropdown").innerHTML,
            'trait':document.getElementById("Secondary-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Secondary-Enchantment-Dropdown").innerHTML,
            'set':$("#Secondary-Set-Name-input").val()
        }
        var weapon3 = {
            'type':document.getElementById("Primary-Weapon Type-Dropdown").innerHTML,
            'trait':document.getElementById("Primary-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Primary-Enchantment-Dropdown").innerHTML,
            'set':$("#Primary-Set-Name-input").val()
        }
        var weapon4 = {
            'type':document.getElementById("Secondary-Weapon Type-Dropdown").innerHTML,
            'trait':document.getElementById("Secondary-Trait-Dropdown").innerHTML,
            'enchant':document.getElementById("Secondary-Enchantment-Dropdown").innerHTML,
            'set':$("#Secondary-Set-Name-input").val()
        }
        var content = `
        Username: ${username}
        Level: ${$("#Level-input").val()}
        --Armour
        Head: ${head.type} ${head.trait} ${head.enchant} ${head.set}
        Shoulders: ${shoulders.type} ${shoulders.trait} ${shoulders.enchant} ${shoulders.set}
        Chest: ${chest.type} ${chest.trait} ${chest.enchant} ${chest.set}
        Legs: ${legs.type} ${legs.trait} ${legs.enchant} ${legs.set}
        Waist: ${waist.type} ${waist.trait} ${waist.enchant} ${waist.set}
        Hands: ${hands.type} ${hands.trait} ${hands.enchant} ${hands.set}
        Feet: ${feet.type} ${feet.trait} ${feet.enchant} ${feet.set}
        --Weapons
        Weapon 1: ${weapon1.type} ${weapon1.trait} ${weapon1.type} ${weapon1.type}
        Weapon 2: ${weapon2.type} ${weapon2.trait} ${weapon2.type} ${weapon2.type}
        Weapon 3: ${weapon3.type} ${weapon3.trait} ${weapon3.type} ${weapon3.type}
        Weapon 4: ${weapon4.type} ${weapon4.trait} ${weapon4.type} ${weapon4.type}`;
        
        $.post(webhook,{"content":content});
        //console.log(content);
    })
});
