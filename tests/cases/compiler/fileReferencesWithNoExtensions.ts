// @Filename: t.ts
/// <reference path="a"/>
/// <reference path="b"/>
/// <reference path="c"/>
var a = aa;  // Check that a.ts is referenced
var b = bb;  // Check that b.d.ts is referenced
var c = cc;  // Check that c.ts has precedence over c.d.ts

// @Filename: a.ts
var aa = 1;

// @Filename: b.d.ts
declare var bb: number;

// @Filename: c.ts
var cc = 1;

// @Filename: c.d.ts
declare var xx: number;
