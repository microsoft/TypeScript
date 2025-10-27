//// [tests/cases/compiler/jsxChildrenIndividualErrorElaborations.tsx] ////

//// [index.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

interface Props {
  children: (x: number) => string;
}

export function Blah(props: Props) {
  return <></>;
}

// Incompatible child.
var a = <Blah>
  {x => x}
</Blah>

// Blah components don't accept text as child elements
var a = <Blah>
  Hello unexpected text!
</Blah>

// Blah components don't accept multiple children.
var a = <Blah>
  {x => "" + x}
  {x => "" + x}
</Blah>

interface PropsArr {
  children: ((x: number) => string)[];
}

export function Blah2(props: PropsArr) {
  return <></>;
}

// Incompatible child.
var a = <Blah2>
  {x => x}
</Blah2>

// Blah2 components don't accept text as child elements
var a = <Blah2>
  Hello unexpected text!
</Blah2>

// Blah2 components don't accept multiple children of the wrong type.
var a = <Blah2>
  {x => x}
  {x => x}
</Blah2>

type Cb = (x: number) => string;
interface PropsMixed {
  children: Cb | Cb[];
}

export function Blah3(props: PropsMixed) {
  return <></>;
}

// Incompatible child.
var a = <Blah3>
  {x => x}
</Blah3>

// Blah3 components don't accept text as child elements
var a = <Blah3>
  Hello unexpected text!
</Blah3>

// Blah3 components don't accept multiple children of the wrong type.
var a = <Blah3>
  {x => x}
  {x => x}
</Blah3>


//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blah = Blah;
exports.Blah2 = Blah2;
exports.Blah3 = Blah3;
/// <reference path="react16.d.ts" />
const React = __importStar(require("react"));
function Blah(props) {
    return React.createElement(React.Fragment, null);
}
// Incompatible child.
var a = React.createElement(Blah, null, x => x);
// Blah components don't accept text as child elements
var a = React.createElement(Blah, null, "Hello unexpected text!");
// Blah components don't accept multiple children.
var a = React.createElement(Blah, null,
    x => "" + x,
    x => "" + x);
function Blah2(props) {
    return React.createElement(React.Fragment, null);
}
// Incompatible child.
var a = React.createElement(Blah2, null, x => x);
// Blah2 components don't accept text as child elements
var a = React.createElement(Blah2, null, "Hello unexpected text!");
// Blah2 components don't accept multiple children of the wrong type.
var a = React.createElement(Blah2, null,
    x => x,
    x => x);
function Blah3(props) {
    return React.createElement(React.Fragment, null);
}
// Incompatible child.
var a = React.createElement(Blah3, null, x => x);
// Blah3 components don't accept text as child elements
var a = React.createElement(Blah3, null, "Hello unexpected text!");
// Blah3 components don't accept multiple children of the wrong type.
var a = React.createElement(Blah3, null,
    x => x,
    x => x);
