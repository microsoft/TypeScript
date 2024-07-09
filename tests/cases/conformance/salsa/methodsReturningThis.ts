// @filename: input.js
// @outFile: output.js
// @allowJs: true
function Class()
{
}

// error: 'Class' doesn't have property 'notPresent'
Class.prototype.containsError = function () { return this.notPresent; };

// lots of methods that return this, which caused out-of-memory in #9527
Class.prototype.m1 = function (a, b, c, d, tx, ty) { return this; };
Class.prototype.m2 = function (x, y) { return this; };
Class.prototype.m3 = function (x, y) { return this; };
Class.prototype.m4 = function (angle) { return this; };
Class.prototype.m5 = function (matrix) { return this; };
Class.prototype.m6 = function (x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) { return this; };
Class.prototype.m7 = function(matrix) { return this; };
Class.prototype.m8 = function() { return this; };
Class.prototype.m9 = function () { return this; };

