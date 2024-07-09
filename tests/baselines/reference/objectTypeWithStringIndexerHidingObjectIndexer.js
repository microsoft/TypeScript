//// [tests/cases/conformance/types/members/objectTypeWithStringIndexerHidingObjectIndexer.ts] ////

//// [objectTypeWithStringIndexerHidingObjectIndexer.ts]
// object types can define string indexers that are more specific than the default 'any' that would be returned
// no errors expected below 

interface Object {
    [x: string]: Object;
}
var o = {};
var r = o['']; // should be Object

class C {
    foo: string;
    [x: string]: string;
}
var c: C;
var r2: string = c[''];

interface I {
    bar: string;
    [x: string]: string;
}
var i: I;
var r3: string = i[''];

var o2: {
    baz: string;
    [x: string]: string;
}
var r4: string = o2[''];




//// [objectTypeWithStringIndexerHidingObjectIndexer.js]
// object types can define string indexers that are more specific than the default 'any' that would be returned
// no errors expected below 
var o = {};
var r = o['']; // should be Object
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var c;
var r2 = c[''];
var i;
var r3 = i[''];
var o2;
var r4 = o2[''];
