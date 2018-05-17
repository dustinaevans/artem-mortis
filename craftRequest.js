/*  Author: Andrew Givens
**  Date: 5/2/2018
**  Notes:  Adding javascript to dynamically create the html form. This will allow for easier editing in the future.
**          Adding jquery functionality for bootstrap components
*/

// these will be any single textfield rows to appear at the top of the form
const playerInfo = ['ESO Username', 'Level'];
const setName = "Set Name";

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
        inputGroup.setAttribute('class', 'input-group mb-3 col-4');


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
            span.setAttribute('id', `${weaponSlot}-${i}-row`);
            span.setAttribute('style', 'justify-content:center;');

            var label = document.createElement('button');
            label.setAttribute('class', 'btn btn-success col-sm-1');
            label.setAttribute('id', `${weaponSlot}-label`);
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

                dropdownDiv = createDropdown(weaponSlot, dropdownLabel, weaponOptionLabels, weapons, weaponTraits, weaponEnchant);
                span.appendChild(dropdownDiv);

            });
            span.appendChild(createSetNameTextbox(weaponSlot));
            form.appendChild(span);
        });
    }

    // Click functions
    $('.dropdown-item').click(function(){
        var dropdownId = $(this).attr('data-id');
        console.log(dropdownId);

        document.getElementById(`${dropdownId}-Dropdown`).innerHTML = this.value;
    });

    $('#Submit-Btn').click(()=>{
        var webhook = "https://discordapp.com/api/webhooks/444376028375285766/kzg-67tlzb2r2umWFo78NQEgjuxpLYKXW2uPzbVS5TzN9AUpYcQdaFxDpeR0nQYKnA5w";
        var head_type = document.getElementById("#Head-Armour Type-Dropdown:first-child").innerHTML;
        var content = `
        Username: ${$("#ESO Username-input").val()}
        Level: ${$("#Level-input").val()}
        --Armour
        Head: ${head_type}`;
        //$.post(webhook,{})
        console.log(content);
    })
});
