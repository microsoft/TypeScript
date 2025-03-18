//// [tests/cases/compiler/numericIndexerTyping2.ts] ////

//// [numericIndexerTyping2.ts]
class I {
    [x: string]: Date
}

class I2 extends I {
}

var i: I;
var r: string = i[1]; // error: numeric indexer returns the type of the string indexer

var i2: I2;
var r2: string = i2[1]; // error: numeric indexer returns the type of the string indexere

//// [numericIndexerTyping2.js]
class I {
}
class I2 extends I {
}
var i;
var r = i[1];
var i2;
var r2 = i2[1];
