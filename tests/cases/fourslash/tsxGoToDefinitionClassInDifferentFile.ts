/// <reference path="fourslash.ts" />

// @jsx: preserve

// @Filename: C.tsx
////export default class /*def*/C {}

// @Filename: a.tsx
////import C from "./C";
////const foo = </*use*/C />;

verify.noErrors();

goTo.marker("use");
verify.goToDefinitionIs("def");
