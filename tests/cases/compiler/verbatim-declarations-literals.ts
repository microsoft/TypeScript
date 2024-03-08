// @strict: true
// @declaration: true
// @target: esnext

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
