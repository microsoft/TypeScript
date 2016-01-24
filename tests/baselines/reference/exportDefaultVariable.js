//// [exportDefaultVariable.ts]
// Regression test for #3018

declare var io: any;

declare module 'module' {
    export default io;
}


//// [exportDefaultVariable.js]
// Regression test for #3018
