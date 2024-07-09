// @jsx: react
// @strict: true
// @esModuleInterop: true
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
