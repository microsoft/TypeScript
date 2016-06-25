// these are widened to any at the point of assignment

var x1 = null;
var y1 = undefined;
var z1 = void 0;

// these are not widened

var x2: null;
var y2: undefined;

var x3: null = null;
var y3: undefined = undefined;
var z3: undefined = void 0;

// widen only when all constituents of union are widening

var x4 = null || null;
var y4 = undefined || undefined;
var z4 = void 0 || void 0;

var x5 = null || x2;
var y5 = undefined || y2;
var z5 = void 0 || y2;