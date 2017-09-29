//// [enumInitializers_const_circular.ts]
const x = E.y;
const enum E {
    y = x,
}


//// [enumInitializers_const_circular.js]
var x = E.y;
