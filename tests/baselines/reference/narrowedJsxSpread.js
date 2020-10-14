//// [narrowedJsxSpread.tsx]
/// <reference path="/.lib/react16.d.ts" />
import React from 'react';
type Props = {
  foo?: string
}

const Component = ({ foo }: Required<Props>) => <p>{foo}</p>;
const Example = (props: Props) => (
  <>
    {props.foo && <Component {...props} />}
  </>
);



//// [narrowedJsxSpread.jsx]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/// <reference path="react16.d.ts" />
var react_1 = __importDefault(require("react"));
var Component = function (_a) {
    var foo = _a.foo;
    return <p>{foo}</p>;
};
var Example = function (props) { return (<>
    {props.foo && <Component {...props}/>}
  </>); };
