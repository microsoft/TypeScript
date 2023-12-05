//// [tests/cases/conformance/pedantic/noUncheckedIndexedAccessDestructuring.ts] ////

//// [noUncheckedIndexedAccessDestructuring.ts]
declare const strArray: string[];
declare const strStrTuple: [string, string];

// Declaration forms for array destructuring

// Destructuring from a simple array -> include undefined
const [s1] = strArray;
s1.toString(); // Should error, s1 possibly undefined

// Destructuring a rest element -> do not include undefined
const [...s2] = strArray;
s2.push(undefined); // Should error, 'undefined' not part of s2's element type

// Destructuring a rest element -> do not include undefined
const [, , ...s3] = strArray;
s3.push(undefined); // Should error, 'undefined' not part of s2's element type

// Declaration forms for object destructuring

declare const strMap: { [s: string]: string };

const { t1 } = strMap;
t1.toString(); // Should error, t1 possibly undefined

const { ...t2 } = strMap;
t2.z.toString(); // Should error

// Test intersections with declared properties
declare const numMapPoint: { x: number, y: number} & { [s: string]: number };
{
    const { x, y, z } = numMapPoint;
    x.toFixed(); // Should OK
    y.toFixed(); // Should OK
    z.toFixed(); // Should error
}

{
    const { x, ...q } = numMapPoint;
    x.toFixed(); // Should OK
    q.y.toFixed(); // Should OK
    q.z.toFixed(); // Should error
}

{
    const { x, ...q } = numMapPoint;
    x.
    toFixed(); // Should OK

    q.
    y.toFixed(); // Should OK

    q.
    z.toFixed(); // Should error
}


declare let target_string: string;
declare let target_string_undef: string | undefined;
declare let target_string_arr: string[];

// Assignment forms
[target_string] = strArray; // Should error
[target_string_undef] = strArray;  // Should OK
[,,, ...target_string_arr] = strArray; // Should OK

{
    let x: number, y: number, z: number | undefined;
    ({ x, y, z } = numMapPoint); // Should OK

    let q: number;
    ({ q } = numMapPoint); // Should error
}


//// [noUncheckedIndexedAccessDestructuring.js]
"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
// Declaration forms for array destructuring
// Destructuring from a simple array -> include undefined
var s1 = strArray[0];
s1.toString(); // Should error, s1 possibly undefined
// Destructuring a rest element -> do not include undefined
var s2 = strArray.slice(0);
s2.push(undefined); // Should error, 'undefined' not part of s2's element type
// Destructuring a rest element -> do not include undefined
var s3 = strArray.slice(2);
s3.push(undefined); // Should error, 'undefined' not part of s2's element type
var t1 = strMap.t1;
t1.toString(); // Should error, t1 possibly undefined
var t2 = __rest(strMap, []);
t2.z.toString(); // Should error
{
    var x = numMapPoint.x, y = numMapPoint.y, z = numMapPoint.z;
    x.toFixed(); // Should OK
    y.toFixed(); // Should OK
    z.toFixed(); // Should error
}
{
    var x = numMapPoint.x, q = __rest(numMapPoint, ["x"]);
    x.toFixed(); // Should OK
    q.y.toFixed(); // Should OK
    q.z.toFixed(); // Should error
}
{
    var x = numMapPoint.x, q = __rest(numMapPoint, ["x"]);
    x.
        toFixed(); // Should OK
    q.
        y.toFixed(); // Should OK
    q.
        z.toFixed(); // Should error
}
// Assignment forms
target_string = strArray[0]; // Should error
target_string_undef = strArray[0]; // Should OK
target_string_arr = strArray.slice(3); // Should OK
{
    var x = void 0, y = void 0, z = void 0;
    (x = numMapPoint.x, y = numMapPoint.y, z = numMapPoint.z); // Should OK
    var q = void 0;
    (q = numMapPoint.q); // Should error
}
