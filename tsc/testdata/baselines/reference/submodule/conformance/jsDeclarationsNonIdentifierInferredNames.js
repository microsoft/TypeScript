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
declare const dynPropName = "data-dyn";
export declare const ExampleFunctionalComponent: ({ "data-testid": dataTestId, [dynPropName]: dynProp }: {
    "data-dyn": any;
    "data-testid": any;
}) => JSX.Element;
export {};


//// [DtsFileErrors]


out/jsDeclarationsNonIdentifierInferredNames.d.ts(5,7): error TS2503: Cannot find namespace 'JSX'.


==== out/jsDeclarationsNonIdentifierInferredNames.d.ts (1 errors) ====
    declare const dynPropName = "data-dyn";
    export declare const ExampleFunctionalComponent: ({ "data-testid": dataTestId, [dynPropName]: dynProp }: {
        "data-dyn": any;
        "data-testid": any;
    }) => JSX.Element;
          ~~~
!!! error TS2503: Cannot find namespace 'JSX'.
    export {};
    