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


//// [DtsFileErrors]


out/jsDeclarationsNonIdentifierInferredNames.d.ts(4,5): error TS2503: Cannot find namespace 'JSX'.


==== ./out/jsDeclarationsNonIdentifierInferredNames.d.ts (1 errors) ====
    export function ExampleFunctionalComponent({ "data-testid": dataTestId, [dynPropName]: dynProp }: {
        "data-testid": any;
        "data-dyn": any;
    }): JSX.Element;
        ~~~
!!! error TS2503: Cannot find namespace 'JSX'.
    declare const dynPropName: "data-dyn";
    export {};
    