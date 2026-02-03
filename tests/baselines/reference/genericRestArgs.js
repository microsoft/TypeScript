//// [tests/cases/compiler/genericRestArgs.ts] ////

//// [genericRestArgs.ts]
function makeArrayG<T>(...items: T[]): T[] { return items; }
var a1Ga = makeArrayG(1, ""); // no error
var a1Gb = makeArrayG<any>(1, ""); 
var a1Gc = makeArrayG<Object>(1, ""); 
var a1Gd = makeArrayG<number>(1, ""); // error

function makeArrayGOpt<T>(item1?: T, item2?: T, item3?: T) {
    return [item1, item2, item3];
}
var a2Ga = makeArrayGOpt(1, ""); 
var a2Gb = makeArrayG<any>(1, "");
var a2Gc = makeArrayG<any[]>(1, ""); // error

//// [genericRestArgs.js]
function makeArrayG() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    return items;
}
var a1Ga = makeArrayG(1, ""); // no error
var a1Gb = makeArrayG(1, "");
var a1Gc = makeArrayG(1, "");
var a1Gd = makeArrayG(1, ""); // error
function makeArrayGOpt(item1, item2, item3) {
    return [item1, item2, item3];
}
var a2Ga = makeArrayGOpt(1, "");
var a2Gb = makeArrayG(1, "");
var a2Gc = makeArrayG(1, ""); // error
