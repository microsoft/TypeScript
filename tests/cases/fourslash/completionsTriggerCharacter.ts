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
    { at: "openQuote", are: ["a", "b"], triggerCharacter: '"' },
    { at: "closeQuote", are: undefined, triggerCharacter: '"' },

    { at: "openSingleQuote", are: ["a", "b"], triggerCharacter: "'" },
    { at: "closeSingleQuote", are: undefined, triggerCharacter: "'" },

    { at: "openTemplate", are: ["a", "b"], triggerCharacter: "`" },
    { at: "closeTemplate", are: undefined, triggerCharacter: "`" },

    { at: "quoteInComment", are: undefined, triggerCharacter: '"' },
    { at: "lessInComment", are: undefined, triggerCharacter: "<" },

    { at: "openTag", includes: "div", triggerCharacter: "<" },
    { at: "lessThan", are: undefined, triggerCharacter: "<" },
);
