//// [objectSpreadElementNegativeParse.ts]
let o7 = { ...o? };
let o8 = { ...*o };
let o9 = { ...matchMedia() { }};
let o10 = { ...get x() { return 12; }};


//// [objectSpreadElementNegativeParse.js]
var o7 = __assign({}, o ?  : );
var o8 = __assign({},  * o);
var o9 = __assign({}, matchMedia()), _a = void 0;
;
var o10 = __assign({}, get, {x: function () { return 12; }});
