//// [enumInitializers_const_notLiteral.ts]
const notALiteralType = 1 ? 2 : 3;
const enum E {
    x = notALiteralType,
}


//// [enumInitializers_const_notLiteral.js]
var notALiteralType = 1 ? 2 : 3;
