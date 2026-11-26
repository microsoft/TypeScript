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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _a, _b;
class C {
}
P in PlaceType;
const D = (_a = class {
    },
    P in PlaceType,
    __setFunctionName(_a, "D"),
    _a);
const E = (_b = class {
    },
    P in 'a' | 'b',
    __setFunctionName(_b, "E"),
    _b);
export {};


//// [mappedTypeProperties.d.ts]
export type PlaceType = 'openSky' | 'roofed' | 'garage';
