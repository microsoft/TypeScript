/// <reference path="fourslash.ts" />

// @jsx: preserve

////const x: "a" | "b" = "/*openQuote*/"/*closeQuote*/;
////const y: 'a' | 'b' = '/*openSingleQuote*/'/*closeSingleQuote*/;
////const z: 'a' | 'b' = `/*openTemplate*/`/*closeTemplate*/;

// @Filename: /a.tsx
////declare namespace JSX {
////    interface Element {}
////    interface IntrinsicElements {
////        div: {};
////    }
////}
////const ctr = </*openTag*/
////const less = 1 </*lessThan*/

verify.completionsAt("openQuote", ["a", "b"], { triggerCharacter: '"' });
verify.completionsAt("closeQuote", undefined, { triggerCharacter: '"' });

verify.completionsAt("openSingleQuote", ["a", "b"], { triggerCharacter: "'" });
verify.completionsAt("closeSingleQuote", undefined, { triggerCharacter: "'" });

verify.completionsAt("openTemplate", ["a", "b"], { triggerCharacter: "`" });
verify.completionsAt("closeTemplate", undefined, { triggerCharacter: "`" });

goTo.marker("openTag");
verify.completionListContains("div", undefined, undefined, undefined, undefined, undefined, { triggerCharacter: "<" });
verify.completionsAt("lessThan", undefined, { triggerCharacter: "<" });
