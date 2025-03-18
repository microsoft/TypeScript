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
Object.defineProperty(exports, "__esModule", { value: true });
class C {
    [P in PlaceType];
}
const D = class {
    [P in PlaceType];
};
const E = class {
    [P in 'a' | 'b'];
};
