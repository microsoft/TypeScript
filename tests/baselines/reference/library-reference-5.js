//// [tests/cases/conformance/references/library-reference-5.ts] ////

//// [index.d.ts]

// Secondary references may not be duplicated if they disagree in content

/// <reference library="alpha" />
declare var foo: any;

//// [index.d.ts]
declare var alpha: any;

//// [index.d.ts]
/// <reference library="alpha" />
declare var bar: any;

//// [index.d.ts]
declare var alpha: {};

//// [root.ts]
/// <reference library="foo" />
/// <reference library="bar" />


//// [root.js]
/// <reference library="foo" />
/// <reference library="bar" />
