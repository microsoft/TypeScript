//// [tests/cases/compiler/tsxUnionSpread.tsx] ////

//// [index.tsx]
namespace JSX {
    export interface Element {}
}

export type CatInfo = { type: 'Cat'; subType: string; };
export type DogInfo = { type: 'Dog'; };
export type AnimalInfo = CatInfo | DogInfo;

function AnimalComponent(info: AnimalInfo): JSX.Element {
    return undefined as any;
}

function getProps(): AnimalInfo {
    // this may be from server or whatever ...
    return { type: 'Cat', subType: 'Large' };
}

var props:AnimalInfo = getProps();
var component = <AnimalComponent {...props} />

var props2:AnimalInfo = { type: 'Cat', subType: 'Large' };
var component2 = <AnimalComponent {...props2} />

//// [index.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function AnimalComponent(info) {
    return undefined;
}
function getProps() {
    // this may be from server or whatever ...
    return { type: 'Cat', subType: 'Large' };
}
var props = getProps();
var component = <AnimalComponent {...props}/>;
var props2 = { type: 'Cat', subType: 'Large' };
var component2 = <AnimalComponent {...props2}/>;
