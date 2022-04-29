// @noEmit: true
// @allowJs: true

// @filename: a.js
export class C1 { }
C1.staticProp = 0;

export function F1() { }
F1.staticProp = 0;

export var C2 = class { };
C2.staticProp = 0;

export let F2 = function () { };
F2.staticProp = 0;

//@filename: global.js
class C3 { }
C3.staticProp = 0;

function F3() { }
F3.staticProp = 0;

var C4 = class { };
C4.staticProp = 0;

let F4 = function () { };
F4.staticProp = 0;

// @filename: b.ts
import * as a from "./a";
var n: number;

var n = a.C1.staticProp;
var n = a.C2.staticProp;
var n = a.F1.staticProp;
var n = a.F2.staticProp;


var n = C3.staticProp;
var n = C4.staticProp;
var n = F3.staticProp;
var n = F4.staticProp;
