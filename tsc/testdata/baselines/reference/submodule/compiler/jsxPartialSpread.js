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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repro = Repro;
const Select = (p) => <p></p>;
function Repro({ SelectProps = {} }) {
    return (<Select value={'test'} {...SelectProps}/>);
}
