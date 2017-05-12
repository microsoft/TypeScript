/// <reference path="fourslash.ts" />

// @jsx: preserve

// @Filename: C.tsx
////export default class C {}

// @Filename: a.tsx
////import /*def*/C from "./C";
////const foo = </*use*/C />;

verify.noErrors();

goTo.marker("use");
verify.goToDefinitionIs("def");
