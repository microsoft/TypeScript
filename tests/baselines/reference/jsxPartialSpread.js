//// [jsxPartialSpread.tsx]
/// <reference path="/.lib/react16.d.ts" />
const Select = (p: {value?: unknown}) => <p></p>;
import React from 'react';

export function Repro({ SelectProps = {} }: { SelectProps?: Partial<Parameters<typeof Select>[0]> }) {
    return (
        <Select value={'test'} {...SelectProps} />
    );
}

//// [jsxPartialSpread.jsx]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Repro = void 0;
/// <reference path="react16.d.ts" />
var Select = function (p) { return <p></p>; };
var react_1 = __importDefault(require("react"));
function Repro(_a) {
    var _b = _a.SelectProps, SelectProps = _b === void 0 ? {} : _b;
    return (<Select value={'test'} {...SelectProps}/>);
}
exports.Repro = Repro;
