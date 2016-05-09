//// [objectSpreadElementNegativeParse.ts]
let o7 = { ...o? };
let o8 = { ...*o };
let o9 = { ...matchMedia() { }};
let o10 = { ...get x() { return 12; }};


//// [objectSpreadElementNegativeParse.js]
var o7 = {  };
var o8 = {  };
var o9 = {  }, _a = void 0;
;
var o10 = { , x: function () { return 12; } };
