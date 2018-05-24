/// <reference path="fourslash.ts" />

// @jsx: preserve

////const x: "a" | "b" = "/*openQuote*/"/*closeQuote*/;
////const y: 'a' | 'b' = '/*openSingleQuote*/'/*closeSingleQuote*/;
////const z: 'a' | 'b' = `/*openTemplate*/`/*closeTemplate*/;
////const q: "`a`" | "`b`" = "`/*openTemplateInQuote*/a`/*closeTemplateInQuote*/";

////// "/*quoteInComment*/ </*lessInComment*/

// @Filename: /a.tsx
////declare namespace JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {};
////    }
////}
////const ctr = </*openTag*/
////const less = 1 </*lessThan*/

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
);
