//// [tests/cases/compiler/verbatim-declarations-literals.ts] ////

//// [verbatim-declarations-literals.ts]
enum E { "some value" = 1 };
const e: typeof E["some value"] = E["some value"];

declare function f3<T>(a: T, b: T): T;
const x3 = f3("abc", "def");  // "abc" | "def"

const octal = 0o16;
const octalParen = ((0o16));
const octalIndirect = octal;

const hex = 0x10;
const hexParen = ((0x10));
const hexIndirect = hex;

const seps = 1_000_000;
const sepsParen = (1_000_000);
const sepsIndirect = seps;

const singleQuote = 'x'
const singleQuoteParen = (('x'))
const singleQuoteIndirect = singleQuote;

const noSubstTemplate = `Test`
const noSubstTemplateParen = (`Test`)
const noSubstTemplateIndirect = noSubstTemplate;


//// [verbatim-declarations-literals.js]
"use strict";
var E;
(function (E) {
    E[E["some value"] = 1] = "some value";
})(E || (E = {}));
;
const e = E["some value"];
const x3 = f3("abc", "def"); // "abc" | "def"
const octal = 0o16;
const octalParen = ((0o16));
const octalIndirect = octal;
const hex = 0x10;
const hexParen = ((0x10));
const hexIndirect = hex;
const seps = 1_000_000;
const sepsParen = (1_000_000);
const sepsIndirect = seps;
const singleQuote = 'x';
const singleQuoteParen = (('x'));
const singleQuoteIndirect = singleQuote;
const noSubstTemplate = `Test`;
const noSubstTemplateParen = (`Test`);
const noSubstTemplateIndirect = noSubstTemplate;


//// [verbatim-declarations-literals.d.ts]
declare enum E {
    "some value" = 1
}
declare const e: typeof E["some value"];
declare function f3<T>(a: T, b: T): T;
declare const x3: "abc" | "def";
declare const octal = 14;
declare const octalParen = 14;
declare const octalIndirect = 14;
declare const hex = 16;
declare const hexParen = 16;
declare const hexIndirect = 16;
declare const seps = 1000000;
declare const sepsParen = 1000000;
declare const sepsIndirect = 1000000;
declare const singleQuote = "x";
declare const singleQuoteParen = "x";
declare const singleQuoteIndirect = "x";
declare const noSubstTemplate = "Test";
declare const noSubstTemplateParen = "Test";
declare const noSubstTemplateIndirect = "Test";
