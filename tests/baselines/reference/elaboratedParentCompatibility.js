//// [elaboratedParentCompatibility.ts]
interface Person {
    residence: House;
}

interface House {
    isHouseOfPain: boolean;
}

declare let home: House;
declare let person: Person; 

home = person.residence.isHouseOfPain; 

declare function fnHouse(home: House): void;
fnHouse(person.residence.isHouseOfPain) // Suggest person.residence
fnHouse((person.residence).isHouseOfPain) // Suggest person.residence
fnHouse(person["residence"].isHouseOfPain) // No suggestion here only suggest on dotted access

enum W { A, B, C }
let wStatic: typeof W = W.A; // Suggest W

class C {
    name: string;
    method (): C {
        let c: C = this.name; // Suggest this
        return c;
    }
}

declare function getC(): C;
let cInstance:C = getC().name // No suggestion, not a dotted name
let cInstance2:C = cInstance.name //Suggest cInstance

function g<T extends { value: string }>(o: T): T {
    return o.value; // Suggestion on type parameter
}

type U = { a: string, c: boolean } | { a: string, d: number, e: string } | { a: string }
declare let u: U;
let c1: { a: string, c: boolean } = u.a // No suggestion here parent is not compatible
if('c' in u) {
    let c2: { a: string, c: boolean } = u.a // Suggestion here, parent is compatible
}

declare const arr: number[];
const arrLength: number[] = arr.map // Suggest the array 


type WeakType = { a?: number; b?: number; }
declare let ow: { prop: { a: number }, prop2: { c: number} };

let weak: WeakType = ow.prop.a // Suggest ow.prop
let r: Record<string, number> = ow.prop.a // No suggestion if target type just has an index signature (prop and prop2 would be valid)
let r2: {c: number } & Record<string, number> = ow.prop2.c // prop2 suggested



//// [elaboratedParentCompatibility.js]
"use strict";
home = person.residence.isHouseOfPain;
fnHouse(person.residence.isHouseOfPain); // Suggest person.residence
fnHouse((person.residence).isHouseOfPain); // Suggest person.residence
fnHouse(person["residence"].isHouseOfPain); // No suggestion here only suggest on dotted access
var W;
(function (W) {
    W[W["A"] = 0] = "A";
    W[W["B"] = 1] = "B";
    W[W["C"] = 2] = "C";
})(W || (W = {}));
var wStatic = W.A; // Suggest W
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () {
        var c = this.name; // Suggest this
        return c;
    };
    return C;
}());
var cInstance = getC().name; // No suggestion, not a dotted name
var cInstance2 = cInstance.name; //Suggest cInstance
function g(o) {
    return o.value; // Suggestion on type parameter
}
var c1 = u.a; // No suggestion here parent is not compatible
if ('c' in u) {
    var c2 = u.a; // Suggestion here, parent is compatible
}
var arrLength = arr.map; // Suggest the array 
var weak = ow.prop.a; // Suggest ow.prop
var r = ow.prop.a; // No suggestion if target type just has an index signature (prop and prop2 would be valid)
var r2 = ow.prop2.c; // prop2 suggested
