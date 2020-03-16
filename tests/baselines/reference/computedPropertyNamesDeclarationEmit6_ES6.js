//// [computedPropertyNamesDeclarationEmit6_ES6.ts]
var v = {
  [-1]: {},
  [+1]: {},
  [~1]: {},
  [!1]: {}
}


//// [computedPropertyNamesDeclarationEmit6_ES6.js]
var v = {
    [-1]: {},
    [+1]: {},
    [~1]: {},
    [!1]: {}
};


//// [computedPropertyNamesDeclarationEmit6_ES6.d.ts]
declare var v: {
    [x: number]: {};
    [-1]: {};
    1: {};
};
