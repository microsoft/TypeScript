/// <reference path="fourslash.ts" />

// @jsx: preserve

////const x: "a" | "b" = "/*openQuote*/"/*closeQuote*/;
////const y: 'a' | 'b' = '/*openSingleQuote*/'/*closeSingleQuote*/;
////const z: 'a' | 'b' = `/*openTemplate*/`/*closeTemplate*/;
////const q: "`a`" | "`b`" = "`/*openTemplateInQuote*/a`/*closeTemplateInQuote*/";

////// "/*quoteInComment*/ </*lessInComment*/

// @Filename: /foo/importMe.ts
////whatever

// @Filename: /a.tsx
////declare namespace JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {};
////    }
////}
////const ctr = </*openTag*/;
////const less = 1 </*lessThan*/;
////const closeTag = <div> foo <//*closeTag*/;
////import something from "./foo//*path*/";
////const divide = 1 //*divide*/

verify.completions(
    { marker: "openQuote", exact: ["a", "b"], triggerCharacter: '"' },
    { marker: "closeQuote", exact: undefined, triggerCharacter: '"' },

    { marker: "openSingleQuote", exact: ["a", "b"], triggerCharacter: "'" },
    { marker: "closeSingleQuote", exact: undefined, triggerCharacter: "'" },

    { marker: "openTemplate", exact: ["a", "b"], triggerCharacter: "`" },
    { marker: "closeTemplate", exact: undefined, triggerCharacter: "`" },

    { marker: "quoteInComment", exact: undefined, triggerCharacter: '"' },
    { marker: "lessInComment", exact: undefined, triggerCharacter: "<" },

    { marker: "openTag", includes: "div", triggerCharacter: "<" },
    { marker: "lessThan", exact: undefined, triggerCharacter: "<" },
    { marker: "closeTag", exact: "div", triggerCharacter: "/" },
    { marker: "path", exact: "importMe", triggerCharacter: "/", isNewIdentifierLocation: true },
    { marker: "divide", exact: undefined, triggerCharacter: "/" },
);
