//// [tests/cases/compiler/jsxImportForSideEffectsNonExtantNoError.tsx] ////

//// [jsxImportForSideEffectsNonExtantNoError.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

import "./App.css"; // doesn't actually exist

const tag = <div></div>;


//// [jsxImportForSideEffectsNonExtantNoError.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="react16.d.ts" />
const React = require("react");
require("./App.css"); // doesn't actually exist
const tag = <div></div>;
