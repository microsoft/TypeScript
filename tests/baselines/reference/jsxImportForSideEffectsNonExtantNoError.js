//// [jsxImportForSideEffectsNonExtantNoError.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

import "./App.css"; // doesn't actually exist

const tag = <div></div>;


//// [jsxImportForSideEffectsNonExtantNoError.js]
"use strict";
exports.__esModule = true;
/// <reference path="react16.d.ts" />
var React = require("react");
require("./App.css"); // doesn't actually exist
var tag = React.createElement("div", null);
