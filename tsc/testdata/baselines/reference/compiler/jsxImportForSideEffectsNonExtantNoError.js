//// [tests/cases/compiler/jsxImportForSideEffectsNonExtantNoError.tsx] ////

//// [jsxImportForSideEffectsNonExtantNoError.tsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";

import "./App.css"; // doesn't actually exist

const tag = <div></div>;


//// [jsxImportForSideEffectsNonExtantNoError.js]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";
import "./App.css"; // doesn't actually exist
const tag = React.createElement("div", null);
