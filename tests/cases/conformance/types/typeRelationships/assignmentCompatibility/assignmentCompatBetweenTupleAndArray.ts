var numStrTuple: [number, string];
var numNumTuple: [number, number];
var numEmptyObjTuple: [number, {}];
var emptyObjTuple: [{}];

var numArray: number[];
var emptyObjArray: {}[];

// no error
numArray = numNumTuple;
emptyObjArray = emptyObjTuple;
emptyObjArray = numStrTuple;
emptyObjArray = numNumTuple;
emptyObjArray = numEmptyObjTuple;

// error
numArray = numStrTuple;
emptyObjTuple = emptyObjArray;
