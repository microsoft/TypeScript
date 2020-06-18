//// [typeGuardNarrowsIndexedAccessOfKnownProperty.ts]
interface Square {
    ["dash-ok"]: "square";
    ["square-size"]: number;
}
 interface Rectangle {
    ["dash-ok"]: "rectangle";
    width: number;
    height: number;
}
 interface Circle {
    ["dash-ok"]: "circle";
    radius: number;
}
 type Shape = Square | Rectangle | Circle;
interface Subshape {
    "0": {
        sub: {
            under: {
                shape: Shape;
            }
        }
    }
}
function area(s: Shape): number {
    switch(s['dash-ok']) {
        case "square": return s['square-size'] * s['square-size'];
        case "rectangle": return s.width * s['height'];
        case "circle": return Math.PI * s['radius'] * s.radius;
    }
}
function subarea(s: Subshape): number {
    switch(s[0]["sub"].under["shape"]["dash-ok"]) {
        case "square": return s[0].sub.under.shape["square-size"] * s[0].sub.under.shape["square-size"];
        case "rectangle": return s[0]["sub"]["under"]["shape"]["width"] * s[0]["sub"]["under"]["shape"].height;
        case "circle": return Math.PI * s[0].sub.under["shape"].radius * s[0]["sub"].under.shape["radius"];
    }
}

interface X {
    0: "xx",
    1: number
}

interface Y {
    0: "yy",
    1: string
}

type A = ["aa", number];
type B = ["bb", string];

type Z = X | Y;

type C = A | B;

function check(z: Z, c: C) {
    z[0] // fine, typescript sees "xx" | "yy"
    switch (z[0]) {
        case "xx":
            var xx: number = z[1] // should be number
            break;
        case "yy":
            var yy: string = z[1] // should be string
            break;
    }
    c[0] // fine, typescript sees "xx" | "yy"
    switch (c[0]) {
        case "aa":
            var aa: number = c[1] // should be number
            break;
        case "bb":
            var bb: string = c[1] // should be string
            break;
    }
}

export function g(pair: [number, string?]): string {
    return pair[1] ? pair[1] : 'nope';
}


//// [typeGuardNarrowsIndexedAccessOfKnownProperty.js]
"use strict";
exports.__esModule = true;
exports.g = void 0;
function area(s) {
    switch (s['dash-ok']) {
        case "square": return s['square-size'] * s['square-size'];
        case "rectangle": return s.width * s['height'];
        case "circle": return Math.PI * s['radius'] * s.radius;
    }
}
function subarea(s) {
    switch (s[0]["sub"].under["shape"]["dash-ok"]) {
        case "square": return s[0].sub.under.shape["square-size"] * s[0].sub.under.shape["square-size"];
        case "rectangle": return s[0]["sub"]["under"]["shape"]["width"] * s[0]["sub"]["under"]["shape"].height;
        case "circle": return Math.PI * s[0].sub.under["shape"].radius * s[0]["sub"].under.shape["radius"];
    }
}
function check(z, c) {
    z[0]; // fine, typescript sees "xx" | "yy"
    switch (z[0]) {
        case "xx":
            var xx = z[1]; // should be number
            break;
        case "yy":
            var yy = z[1]; // should be string
            break;
    }
    c[0]; // fine, typescript sees "xx" | "yy"
    switch (c[0]) {
        case "aa":
            var aa = c[1]; // should be number
            break;
        case "bb":
            var bb = c[1]; // should be string
            break;
    }
}
function g(pair) {
    return pair[1] ? pair[1] : 'nope';
}
exports.g = g;
