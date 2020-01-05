//// [elaboratedMissingChildAccess.ts]
interface Person {
    residence: House;
    birthDay: Date;
    anniversary?: Date
}

interface House {
    isHouseOfPain: boolean;
    occupants: number;
    heatingBill: number;
    waterBill: number;
    gasBill: number;
    size: number;
    rooms: number;
}

declare let home: House;
declare let person: Person; 

home = person;  // Suggest residence
let isHouseOfPain: boolean = home; // Suggest isHouseOfPain
let bill: number = home; /// To many possibilities, do not make suggestions
let someDate: Date  = person; // Suggest birthDay
let someDateOrUndefined: Date | undefined  = person; // Suggest birthDay or anniversary

enum W { A, B, C }
let w: W = W;  // Special suggestion for enums

class C {
    name: string;
    method () {
        let name: string = this; // Suggestion on this
        return name;
    }
}

declare function getC(): C;
let fn: () => string = new C(); // No suggestion here, not a dotted access
let cInstance = new C();
fn = cInstance; // Suggestion here
fn = getC() // No suggestion here either, not a dotted parameter


function g<T extends { value: string }>(o: T): string {
    return o; // Suggestion on type parameter (value)
}


type U = { a: string, c: boolean } | { a: string, d: number, e: string }

declare let u: U;
let a: string = u;
let c: boolean = u; // No suggestion here, since valid member is not on all constituents

if( 'c' in u) {
    let c2: boolean = u; // Suggestion here 
}

declare const o: Object;
const fn2: (v: Object) => boolean = o; // No suggestions from Object (isPrototypeOf would be valid)

declare const f: Function;
const fnLength: number = f // No suggestions from Function 

declare const arr: number[];
const arrLength: number = arr // Suggest length from array
const fn3: <U>(callbackfn: (value: number) => U) => U[]= arr; // Suggest 'map', 'filter'

type WeakType = { a?: number; b?: number; }
declare let ow: { prop: { a: number }, prop2: { c: number} };

let weak: WeakType = ow // Suggest prop
let r: Record<string, number> = ow // No suggestion if target type just has an index signature (prop and prop2 would be valid)
let r2: {c: number } & Record<string, number> = ow // prop2 suggested



//// [elaboratedMissingChildAccess.js]
"use strict";
home = person; // Suggest residence
var isHouseOfPain = home; // Suggest isHouseOfPain
var bill = home; /// To many possibilities, do not make suggestions
var someDate = person; // Suggest birthDay
var someDateOrUndefined = person; // Suggest birthDay or anniversary
var W;
(function (W) {
    W[W["A"] = 0] = "A";
    W[W["B"] = 1] = "B";
    W[W["C"] = 2] = "C";
})(W || (W = {}));
var w = W; // Special suggestion for enums
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.method = function () {
        var name = this; // Suggestion on this
        return name;
    };
    return C;
}());
var fn = new C(); // No suggestion here, not a dotted access
var cInstance = new C();
fn = cInstance; // Suggestion here
fn = getC(); // No suggestion here either, not a dotted parameter
function g(o) {
    return o; // Suggestion on type parameter (value)
}
var a = u;
var c = u; // No suggestion here, since valid member is not on all constituents
if ('c' in u) {
    var c2 = u; // Suggestion here 
}
var fn2 = o; // No suggestions from Object (isPrototypeOf would be valid)
var fnLength = f; // No suggestions from Function 
var arrLength = arr; // Suggest length from array
var fn3 = arr; // Suggest 'map', 'filter'
var weak = ow; // Suggest prop
var r = ow; // No suggestion if target type just has an index signature (prop and prop2 would be valid)
var r2 = ow; // prop2 suggested
