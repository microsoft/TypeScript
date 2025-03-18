//// [tests/cases/conformance/es7/trailingCommasInBindingPatterns.ts] ////

//// [trailingCommasInBindingPatterns.ts]
const [...a,] = [];
const {...b,} = {};
let c, d;
([...c,] = []);
({...d,} = {});

// Allowed for non-rest elements
const [e,] = <any>[];
const {f,} = <any>{};
let g, h;
([g,] = <any>[]);
({h,} = <any>{});


//// [trailingCommasInBindingPatterns.js]
const [...a,] = [];
const { ...b, } = {};
let c, d;
([...c,] = []);
({ ...d, } = {});
const [e,] = [];
const { f, } = {};
let g, h;
([g,] = []);
({ h, } = {});
