//// [tests/cases/compiler/jsxPartialSpread.tsx] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repro = Repro;
/// <reference path="react16.d.ts" />
const Select = (p) => <p></p>;
const react_1 = __importDefault(require("react"));
function Repro({ SelectProps = {} }) {
    return (<Select value={'test'} {...SelectProps}/>);
}
