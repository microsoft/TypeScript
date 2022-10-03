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