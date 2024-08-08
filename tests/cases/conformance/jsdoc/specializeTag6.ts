// @checkJs: true
// @jsx: react
// @outDir: dist/
// @declaration: true
// @esModuleInterop: true
// @filename: specializeTag6.jsx
/// <reference path="/.lib/react16.d.ts" />
import React from 'react'

/**
 * @template T
 * @param {object} props
 * @param {T} props.value
 * @returns {React.ReactElement}
 */
function Input(props) {
    return null;
}

/** @specialize {number} */
const el1 = <Input value={1} />;

const el2 = /** @specialize {number} */(<Input value={2} />);

/** @specialize {number} */
const el3 = <Input value="abc" />; // Type error

const el4 = /** @specialize {number} */(<Input value="abc" />); // Type error
