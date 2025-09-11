/// <reference path='fourslash.ts' />

// Test case to reproduce the debug assertion failure
// When moving symbols that don't have a parent but aren't modules
// This reproduces the scenario with symbols exported separately from declaration

// @Filename: /lib.ts
////const Component = function() { return "component"; };
////export { Component };

// @Filename: /main.ts
////import { Component } from "./lib";
////[|function useComponent() {
////    return Component();
////}|]

verify.moveToNewFile({
    newFileContents: {
        "/main.ts": ``,
        "/useComponent.ts": `import { Component } from "./lib";

function useComponent() {
    return Component();
}
`
    }
});