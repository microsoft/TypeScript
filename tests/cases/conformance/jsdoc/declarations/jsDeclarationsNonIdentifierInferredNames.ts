// @allowJs: true
// @checkJs: true
// @target: es6
// @outDir: ./out
// @declaration: true
// @jsx: react
// @filename: jsDeclarationsNonIdentifierInferredNames.jsx
/// <reference path="/.lib/react16.d.ts" />
import * as React from "react";
const dynPropName = "data-dyn";
export const ExampleFunctionalComponent = ({ "data-testid": dataTestId, [dynPropName]: dynProp }) => (
    <>Hello</>
);