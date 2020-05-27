/// <reference path="fourslash.ts" />

// @jsx: preserve

/////** @/*tag*/ */
//////</*comment*/
////const x: "a" | "b" = "[|/*openQuote*/|]"/*closeQuote*/;
////const y: 'a' | 'b' = '[|/*openSingleQuote*/|]'/*closeSingleQuote*/;
////const z: 'a' | 'b' = `[|/*openTemplate*/|]`/*closeTemplate*/;
////const q: "`a`" | "`b`" = "[|`/*openTemplateInQuote*/a`/*closeTemplateInQuote*/|]";

////// "/*quoteInComment*/ </*lessInComment*/

// @Filename: /foo/importMe.ts
////whatever

// @Filename: /a.tsx
////declare global {
////    namespace JSX {
////        interface Element {}
////        interface IntrinsicElements {
////            div: {};
////        }
////    }
////}
////const ctr = </*openTag*/;
////const less = 1 </*lessThan*/;
////const closeTag = <div> foo <//*closeTag*/;
////import something from "./foo//*path*/";
////const divide = 1 //*divide*/

verify.completions(
    { marker: "tag", includes: ["param"], triggerCharacter: "@" },
    { marker: "comment", exact: undefined, triggerCharacter: "<" },

    { marker: "openQuote", exact: [
        { name: "a", replacementSpan: test.ranges()[0] },
        { name: "b", replacementSpan: test.ranges()[0] }
    ], triggerCharacter: '"' },
    { marker: "closeQuote", exact: undefined, triggerCharacter: '"' },

    { marker: "openSingleQuote", exact: [
        { name: "a", replacementSpan: test.ranges()[1] },
        { name: "b", replacementSpan: test.ranges()[1] }
    ], triggerCharacter: "'" },
    { marker: "closeSingleQuote", exact: undefined, triggerCharacter: "'" },

    { marker: "openTemplate", exact: [
        { name: "a", replacementSpan: test.ranges()[2] },
        { name: "b", replacementSpan: test.ranges()[2] }
    ], triggerCharacter: "`" },
    { marker: "closeTemplate", exact: undefined, triggerCharacter: "`" },

    { marker: "quoteInComment", exact: undefined, triggerCharacter: '"' },
    { marker: "lessInComment", exact: undefined, triggerCharacter: "<" },

    { marker: "openTag", includes: "div", triggerCharacter: "<" },
    { marker: "lessThan", exact: undefined, triggerCharacter: "<" },
    { marker: "closeTag", exact: "div>", triggerCharacter: "/" },
    { marker: "path", exact: "importMe", triggerCharacter: "/", isNewIdentifierLocation: true },
    { marker: "divide", exact: undefined, triggerCharacter: "/" },
);
