//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsNonIdentifierInferredNames.ts] ////

//// [jsDeclarationsNonIdentifierInferredNames.jsx]
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";
const dynPropName = "data-dyn";
export const ExampleFunctionalComponent = ({ "data-testid": dataTestId, [dynPropName]: dynProp }) => (
    <>Hello</>
);

//// [jsDeclarationsNonIdentifierInferredNames.js]
/// <reference path="react16.d.ts" />
import * as React from "react";
const dynPropName = "data-dyn";
export const ExampleFunctionalComponent = ({ "data-testid": dataTestId, [dynPropName]: dynProp }) => (React.createElement(React.Fragment, null, "Hello"));


//// [jsDeclarationsNonIdentifierInferredNames.d.ts]
export function ExampleFunctionalComponent({ "data-testid": dataTestId, [dynPropName]: dynProp }: {
    "data-testid": any;
    "data-dyn": any;
}): JSX.Element;
declare const dynPropName: "data-dyn";
export {};
