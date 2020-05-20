// @jsx: preserve
// @esModuleInterop: true
// @strict: true
/// <reference path="/.lib/react16.d.ts" />
const Select = (p: {value?: unknown}) => <p></p>;
import React from 'react';

export function Repro({ SelectProps = {} }: { SelectProps?: Partial<Parameters<typeof Select>[0]> }) {
    return (
        <Select value={'test'} {...SelectProps} />
    );
}