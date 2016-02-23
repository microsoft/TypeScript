//// [tests/cases/conformance/references/library-reference-4.ts] ////

//// [index.d.ts]

// Secondary references may be duplicated if they agree in content

/// <reference library="alpha" />
declare var foo: any;

//// [index.d.ts]
declare var alpha: any;

//// [index.d.ts]
/// <reference library="alpha" />
declare var bar: any;

//// [index.d.ts]
declare var alpha: any;

//// [root.ts]
/// <reference library="foo" />
/// <reference library="bar" />


//// [root.js]
/// <reference library="foo" />
/// <reference library="bar" />
