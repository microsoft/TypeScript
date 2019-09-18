// @noEmit: true
// @strict: true

function F() {}
F["prop"] = function() {};

const f = function () {};
F["prop"] = 3;
