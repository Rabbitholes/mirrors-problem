/* 
    process-definition-file.js  
    Main file for processing definitions.
    
    // assupmtions
    * format, input, typing, etc.
    * attempting to not google much of anything
    * refrain from useful packages: ex. matrix representations / math

    // todo
    * determeine file type (ascii)
    * TDD?
    * Create formal object structure with normailized names.
    * logging /traceability
    * async (ensure threads are safe)
    * function input typings and null check
    * nvmrc file
    * create string CSV shared function
    * try/catch error hadnling
    * assign mirrors to matrix !important!

    // Requirements 
    
    At a minimum, your application should print the following to the screen:
    The dimensions of the board
    The start position of the laser in the format (X, Y) and the orientation (H or V)
    The exit point of the laser in the format (X, Y) and the orientation (H or V)
 */

const fs = require('fs');
const defaultFilePath = '';
const defaultFileName = 'definition-file.txt';
const defaultFileLocation = defaultFilePath + defaultFileName;
const defaultFileFormat = 'ascii';

function processDefinitionFile() {
    try {
        console.log("Processing file...");
        fs.readFile(defaultFileLocation, defaultFileFormat, function(err, data) {;
            if (err) throw err;
            var textByLine = data.split("\n")
            console.log("Evaluating lines...");
            //console.debug(textByLine);
            evaluateLines(textByLine);
        });
    } catch (error) {
        console.error(error);
    }
}

// constants
const RR = "RR"; // 1 way right 
const R = "R"; // reflective 2 ways
const LL = "LL"; // 1 way left
const L = "L"; // reflective 2 way
const empty = ""; // rm?
const horiontalEntry = "H"; // 
const verticalEntry = "V"; // 
const blankSpacerLine = "-1"; // todo - int match

const verticalDisplayName = "Vertically";
const hoiztonallDisplayName = "Horizontally";

// variables
var boardSize = [];
var mirrorPlacements = [];
var lazerEntry = [];
var genericSection = { _sectionInfo: [], _remainingLinesOfFile: [] };
var boardSizeSection = {...genericSection };
var mirrorPlacementsSection = {...genericSection };
var lazerEntrySection = {...genericSection };
var totalSectionsProcessed = 0;

class LazerEntryInfo {

    constructor(lazerEntryFileString) {
        // console.debug(lazerEntryFileString);
        // hacky striaghtfoward string breakdown
        var lazyInfoString = lazerEntryFileString.split(','); //doesn't work all the time
        var secondPart = "";
        var firstPartX = lazyInfoString[0];
        var secondPart = lazyInfoString[1];
        var secondPartYStart = secondPart.slice(0, -1);
        var secondPartOrientation = secondPart.charAt(secondPart.length - 1);

        // assign to info to class
        this._lazerEntryPosition = '[' + firstPartX + ',' + secondPartYStart + ']';
        this._lazerEntryPositionX = parseInt(firstPartX);
        this._lazerEntryPositionY = parseInt(secondPartYStart);
        this._lazerEntryOrientation = this.setLazerOrientation(secondPartOrientation);
    }

    // friendly display name converstion
    setLazerOrientation(lazerOrientationString) {
        //var orientation = lazyOrientationString ? verticalEntry : horiontalEntry;
        //console.debug("lazerOrientationString is %s... \n", lazerOrientationString)
        if (lazerOrientationString == verticalEntry) {
            return verticalDisplayName;
        } else {
            return hoiztonallDisplayName;
        }
    }
}

function evaluateLines(arrayOfLines, func) {
    let result = ''; // rm?

    // Get Board Size
    boardSizeSection = processUntillNextSection(arrayOfLines);
    boardSize = boardSizeSection._sectionInfo;
    console.log("Board Size is %s... \n", boardSize)

    // Get Mirror placements
    mirrorPlacementsSection = processUntillNextSection(boardSizeSection._remainingLinesOfFile); //todo - tuple return slice old & clean up
    mirrorPlacements = mirrorPlacementsSection._sectionInfo;
    console.log("Mirror Placements %s... \n", mirrorPlacements);

    // Get Lazer Entry
    lazerEntrySection = processUntillNextSection(mirrorPlacementsSection._remainingLinesOfFile);
    lazerEntry = lazerEntrySection._sectionInfo;
    console.log("Lazer Entry %s... \n", lazerEntry);
    var lazerEntryClass = new LazerEntryInfo(lazerEntry[0]);

    // Get File Output
    var fileOutput = {
        _boardSize: boardSize[0], // todo - use class
        _lazerEntryPosition: lazerEntryClass._lazerEntryPosition,
        _lazerEntryOrientation: lazerEntryClass._lazerEntryOrientation,
        _lazerExitPosition: [0, 1], // _lazerExitPosition, // todo - finish
        _lazerExitOrientation: "Vertical" //_lazerExitOrientation
    };

    // Setup Board "Visual"
    generatorBoard(boardSize);

    // Assign Mirror placements in Board
    // TODO: Start Here

    console.log('\n \n');
    console.log("-----Required Output-----");
    console.log("Board Dimensions: %s \n", fileOutput._boardSize);
    console.log("Lazer Start Position: %s \n", fileOutput._lazerEntryPosition);

    console.log("Lazer Strat Orientation: %s \n", fileOutput._lazerEntryOrientation);

    console.log('\n \n');

    console.log("-----Todo: Light Travel Maze-----");
    console.log('\n \n');
    console.log("Lazer Exit Position: %s \n", fileOutput._lazerExitPosition);
    console.log("Lazer Exit Orientation: %s \n", fileOutput._lazerExitOrientation);

}


// Generate Board Representation ()
// Assumption input is an array and the first item is a CVS with X, Y board demension.
function generatorBoard(_boardSize) {
    console.log("Generating a Board w/ dimensions %s...", _boardSize[0]);
    var stringOfBoardSize = _boardSize[0];
    var boardSizeXandY = stringOfBoardSize.split(',');
    var boardXSize = parseInt(boardSizeXandY[0]);
    var boardYSize = parseInt(boardSizeXandY[1]);

    // create map/matrix
    var boardMatrix = {}; //[]; Obj/HashMap vs. Array
    var i = 0;

    var boardCordInfo = {
        top: null,
        right: null,
        left: null,
        bottom: null
    };

    for (; i < boardXSize;) {
        var z = 0;
        for (; z < boardYSize;) {
            //console.debug("%s %s", i, z);
            //boardMatrix.push(i + ',' + z); // todo better matrix setup
            var matrixKey = i + ',' + z
            boardMatrix[matrixKey] = {...boardCordInfo };
            z++;
        }
        i++;
    }
    console.log(boardMatrix);
    return boardMatrix;
}

//assumption - duplicates
// limit? failover?
function processUntillNextSection(anArray) {
    if (anArray.length <= 0) { //todo - input validation
        console.debug("End of file/section found...");
        return
    }
    console.log("Processing Section #%s: (Total Lines: %s)...", totalSectionsProcessed, anArray.length);
    //console.debug("Processing Section #%s: (Total Lines: %s w/ content %s)...", totalSectionsProcessed, anArray.length, anArray);
    let sectionResults = {...genericSection };
    const originalArray = [...anArray]; //cloning : todo clean up
    var theSection = [];
    for (const aLine of anArray) {
        //console.debug("processUntillNextSection: aLine %s...", aLine);
        originalArray.shift();
        if (isBlankSpace(aLine)) {
            totalSectionsProcessed++;
            console.log("Completed Processing Section #%s...", totalSectionsProcessed);
            sectionResults._sectionInfo = theSection;
            sectionResults._remainingLinesOfFile = originalArray;
            //console.log("Completed Processing Section #%s:%s...", totalSectionsProcessed, theSection);
            return sectionResults;
        } else {
            theSection.push(aLine);
        }
    }
}

// isBlankSpace () - Shared method checking for blank spaces in the file.
function isBlankSpace(aBlankLine) {
    //console.debing("Checking blank spacer line ( %s === %s )", blankSpacerLine, aBlankLine);
    return (aBlankLine === blankSpacerLine);
}

// Start Processing Definition File
processDefinitionFile();