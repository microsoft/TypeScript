//// [tests/cases/conformance/jsdoc/specializeTag6.ts] ////

//// [specializeTag6.jsx]
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


//// [specializeTag6.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
var react_1 = __importDefault(require("react"));
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
var el1 = react_1.default.createElement(Input, { value: 1 });
var el2 = /** @specialize {number} */ (react_1.default.createElement(Input, { value: 2 }));
/** @specialize {number} */
var el3 = react_1.default.createElement(Input, { value: "abc" }); // Type error
var el4 = /** @specialize {number} */ (react_1.default.createElement(Input, { value: "abc" })); // Type error


//// [specializeTag6.d.ts]
export {};
