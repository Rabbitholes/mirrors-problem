/* 
    shared-methods.js  
    * File to house methods shared methods
    * junk drawer at the momment

*/

// todo: incomplete
// todo: validate it works with all strings 
function stringInputToBreakdown(_stringInput) {
    var stringInput = _stringInput.split(',');

    console.log(stringInput);

    var currentPart = 0;
    var firstPart = stringInput[0];
    var secondPart = "";

    // var thirdPart = "";
    var lazerParts = [];


    // hacky striaghtfoward string

    var secondPart = lazyInfoString[1];

    var secondPartYStart = secondPart.slice(0, -1);
    console.log(secondPartYStart);

    var secondPartOrientation = secondPart.charAt(secondPart.length - 1);

    return { firstPart, secondPart, thirdPart }
}

// cli input
// stretch: clinput
// for (let j = 0; j < process.argv.length; j++) {
//     console.log(j + ' -> ' + (process.argv[j]));
// }