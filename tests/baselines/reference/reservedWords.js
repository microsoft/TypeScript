//// [reservedWords.ts]
var obj = {
    if: 0,
    debugger: 2,
    break: 3,
    function: 4
}

//This compiles.

var obj2 = {
    if: 0,
    while: 1,
    debugger: 2,
    break: 3,
    function: 4
}


//// [reservedWords.js]
var obj = {
    "if": 0,
    "debugger": 2,
    "break": 3,
    "function": 4
};
//This compiles.
var obj2 = {
    "if": 0,
    "while": 1,
    "debugger": 2,
    "break": 3,
    "function": 4
};
