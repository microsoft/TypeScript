//// [tests/cases/conformance/es6/computedProperties/computedPropertyNamesDeclarationEmit6_ES5.ts] ////

//// [computedPropertyNamesDeclarationEmit6_ES5.ts]
var v = {
  [-1]: {},
  [+1]: {},
  [~1]: {},
  [!1]: {}
}


//// [computedPropertyNamesDeclarationEmit6_ES5.js]
var _a;
var v = (_a = {},
    _a[-1] = {},
    _a[+1] = {},
    _a[~1] = {},
    _a[!1] = {},
    _a);


//// [computedPropertyNamesDeclarationEmit6_ES5.d.ts]
declare var v: {
    [x: number]: {};
    [-1]: {};
    1: {};
};
