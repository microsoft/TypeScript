//// [tests/cases/conformance/jsx/checkJsxUnionSFXContextualTypeInferredCorrectly.tsx] ////

//// [checkJsxUnionSFXContextualTypeInferredCorrectly.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from 'react';

interface PS {
    multi: false
    value: string | undefined
    onChange: (selection: string | undefined) => void
}

interface PM {
    multi: true
    value: string[]
    onChange: (selection: string[]) => void
}

export function ComponentWithUnion(props: PM | PS) {
    return <h1></h1>;
}

// Usage with React tsx
export function HereIsTheError() {
    return (
        <ComponentWithUnion
            multi={false}
            value={'s'}
            onChange={val => console.log(val)} // <- this throws an error
        />
    );
}

// Usage with pure TypeScript
ComponentWithUnion({
    multi: false,
    value: 's',
    onChange: val => console.log(val) // <- this works fine
});


//// [checkJsxUnionSFXContextualTypeInferredCorrectly.js]
"use strict";
/// <reference path="react16.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentWithUnion = ComponentWithUnion;
exports.HereIsTheError = HereIsTheError;
var react_1 = __importDefault(require("react"));
function ComponentWithUnion(props) {
    return react_1.default.createElement("h1", null);
}
// Usage with React tsx
function HereIsTheError() {
    return (react_1.default.createElement(ComponentWithUnion, { multi: false, value: 's', onChange: function (val) { return console.log(val); } }));
}
// Usage with pure TypeScript
ComponentWithUnion({
    multi: false,
    value: 's',
    onChange: function (val) { return console.log(val); } // <- this works fine
});
