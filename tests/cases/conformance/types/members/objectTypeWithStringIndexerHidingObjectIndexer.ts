// @skipDefaultLibCheck: false
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


