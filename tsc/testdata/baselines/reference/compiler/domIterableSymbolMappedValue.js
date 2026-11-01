//// [tests/cases/compiler/domIterableSymbolMappedValue.ts] ////

//// [domIterableSymbolMappedValue.ts]
declare const styles: Partial<Pick<CSSStyleDeclaration, keyof CSSStyleDeclaration & symbol>>;
declare function element(styles: Partial<Record<keyof CSSStyleDeclaration, string>>): void;
element(styles);


//// [domIterableSymbolMappedValue.js]
"use strict";
element(styles);
