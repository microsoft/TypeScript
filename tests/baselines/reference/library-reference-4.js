//// [tests/cases/conformance/references/library-reference-4.ts] ////

//// [index.d.ts]
// Secondary references may be duplicated if they agree in content

/// <reference types="alpha" />
declare var foo: any;

//// [index.d.ts]
declare var alpha: any;

//// [index.d.ts]
/// <reference types="alpha" />
declare var bar: any;

//// [index.d.ts]
declare var alpha: any;

//// [root.ts]
/// <reference types="foo" />
/// <reference types="bar" />


//// [root.js]
/// <reference types="foo" />
/// <reference types="bar" />
