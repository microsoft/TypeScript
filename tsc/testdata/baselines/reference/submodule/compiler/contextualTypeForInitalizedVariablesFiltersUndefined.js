//// [tests/cases/compiler/contextualTypeForInitalizedVariablesFiltersUndefined.ts] ////

//// [contextualTypeForInitalizedVariablesFiltersUndefined.ts]
const fInferred = ({ a = 0 } = {}) => a;
// const fInferred: ({ a }?: { a?: number; }) => number

const fAnnotated: typeof fInferred = ({ a = 0 } = {}) => a;

declare var t: { s: string } | undefined;
const { s } = t;
function fst({ s } = t) { }


//// [contextualTypeForInitalizedVariablesFiltersUndefined.js]
const fInferred = ({ a = 0 } = {}) => a;
// const fInferred: ({ a }?: { a?: number; }) => number
const fAnnotated = ({ a = 0 } = {}) => a;
const { s } = t;
function fst({ s } = t) { }
