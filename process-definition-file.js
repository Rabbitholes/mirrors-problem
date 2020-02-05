// process-definition-file.js  
// Main file for processing defiitions.

// A Sample Text File
// 5,4
// -1
// 1,2RR
// 3,2L
// -1
// 1,0V
// -1

const fs = require('fs');
const defaultFilePath = '';
const defaultFileName = 'definition-file.txt';
const defaultFileLocation = defaultFilePath + defaultFileName;

// for (let j = 0; j < process.argv.length; j++) {
//     console.log(j + ' -> ' + (process.argv[j]));
// }

// todo - determeine file type
// tests?

try {
    console.log("Processing file...");
    fs.readFile(defaultFileLocation, 'utf-8', function(err, data) {;
        if (err) throw err;
        var textByLine = data.split("\n")
        console.log("Evaluating lines...");
        evaluateLines(textByLine);
    });
} catch (error) {
    console.error(error);
}



// for (const aLine of textByLine) {

//     console.log("Evaluating lines...");
//     console.log(aLine);
// }

// console.log("-");
// console.log(typeof textByLine);

// todo - so many assupmtions  (format and such)


// The board size
// Mirror placements

const RR = "RR"; // 1 way right 
const R = "R"; // reflective 2 ways
const LL = "LL"; // 1 way left
const L = "L"; // reflective 2 way
const empty = "";


const horiontalEntry = "H"; // 
const verticalEntry = "L"; // 

const blankSpacerLine = -1;
var boardSize = [];

function evaluateLines(arrayOfLines, func) {
    let result = '';

    boardSize = arrayOfLines.shift();
    console.log("Board Size is %s...", boardSize);


    console.log("Expected black spacer line %s...", blankSpacerLine);
    isBlankSpace(arrayOfLines.shift());

    processUntillNextBlank()
    for (const aLine of arrayOfLines) {
        console.log(aLine);
    }
    console.log(result);
}

function processSection(arrayOfLines) {
    console.log("Processing a Section...", boardSize);
    var theSection = [];
    for (const aLine of arrayOfLines) {
        if (isBlankSpace)
            return theSection
        else
            aSection += aLine;
    }
}

function isBlankSpace(aLine) {
    console.log("Checking black spacer line ( %s === %s )", blankSpacerLine, aLine);
    console.debug(aLine);
    return (aLine === blankSpacerLine);
    // if (aLine !== blankSpacerLine) {
    //     console.log("Expected black spacer line (-1)")
    //     throw err
    // } else {
    //     return true;
    // }
}