//// [tests/cases/compiler/exportDefaultDuplicateCrash.ts] ////

//// [exportDefaultDuplicateCrash.ts]
// #38214

export default function () { }
export { default } from './hi'
export { aa as default } from './hi'


//// [exportDefaultDuplicateCrash.js]
// #38214
export default function () { }
export { default } from './hi';
export { aa as default } from './hi';
