//// [tests/cases/conformance/types/mapped/mappedTypeProperties.ts] ////

//// [mappedTypeProperties.ts]
export type PlaceType = 'openSky' | 'roofed' | 'garage'
type Before = {
    model: 'hour' | 'day';
    [placeType in PlaceType]: void;
}

type After = {
    [placeType in PlaceType]: void;
    model: 'hour' | 'day'
}

type AfterQuestion = {
    [placeType in PlaceType]?: void;
    model: 'hour' | 'day';
}
type AfterMethod = {
    [placeType in PlaceType]?: void;
    model(duration: number): 'hour' | 'day';
}

type AfterImplicit = {
    [placeType in PlaceType]
    model: 'hour' | 'day';
}
type AfterImplicitQ = {
    [placeType in PlaceType]?
    model: 'hour' | 'day'
}

interface I {
    [P in PlaceType]: any
}
class C {
    [P in PlaceType]: any
}
const D = class {
    [P in PlaceType]: any
}
const E = class {
    [P in 'a' | 'b']: any
}


//// [mappedTypeProperties.js]
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
P in PlaceType;
var D = (_a = /** @class */ (function () {
        function class_1() {
        }
        return class_1;
    }()),
    P in PlaceType,
    _a);
var E = (_b = /** @class */ (function () {
        function class_2() {
        }
        return class_2;
    }()),
    P in 'a' | 'b',
    _b);


//// [mappedTypeProperties.d.ts]
export type PlaceType = 'openSky' | 'roofed' | 'garage';
