//// [tests/cases/compiler/enumBracketComputedPropertyName.ts] ////

//// [enumBracketComputedPropertyName.ts]
// Enum members with non-identifier names should be usable as computed property
// keys in type literals, interfaces, and class members (GH#25083).

enum E {
    "hello world" = "hw",
    "3x14" = "pi",
    normal = "n",
}

// type literal
type T1 = { [E["hello world"]]: string };
type T2 = { [E["3x14"]]: boolean };
type T3 = { [E["normal"]]: number };   // bracket access to a normal-identifier member

// interface
interface I1 {
    [E["hello world"]]: string;
}

// access back through the computed key
declare const t1: T1;
const v1: string = t1[E["hello world"]];
const v2: string = t1["hw"];   // literal value


//// [enumBracketComputedPropertyName.js]
"use strict";
// Enum members with non-identifier names should be usable as computed property
// keys in type literals, interfaces, and class members (GH#25083).
var E;
(function (E) {
    E["hello world"] = "hw";
    E["3x14"] = "pi";
    E["normal"] = "n";
})(E || (E = {}));
const v1 = t1[E["hello world"]];
const v2 = t1["hw"]; // literal value
