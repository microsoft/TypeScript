//// [tests/cases/conformance/references/library-reference-5.ts] ////

//// [index.d.ts]
// Secondary references may not be duplicated if they disagree in content

/// <reference types="alpha" />
declare var foo: any;

//// [index.d.ts]
declare var alpha: any;

//// [index.d.ts]
/// <reference types="alpha" />
declare var bar: any;

//// [index.d.ts]
declare var alpha: {};

//// [root.ts]
/// <reference types="foo" />
/// <reference types="bar" />


//// [root.js]
/// <reference types="foo" />
/// <reference types="bar" />
