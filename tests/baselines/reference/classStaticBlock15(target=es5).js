//// [classStaticBlock15.ts]
class C {
  static #_1 = 1;
  static #_3 = 3;
  static #_5 = 5;

  static {}
  static {}
  static {}
  static {}
  static {}
  static {}
}

console.log(_C__1)


//// [classStaticBlock15.js]
var C = /** @class */ (function () {
    function C() {
    }
    var _a, _C__1_1, _C__3, _C__5, _C__, _C__2, _C__4, _C__6, _C__7, _C__8;
    _a = C;
    _C__1_1 = { value: 1 };
    _C__3 = { value: 3 };
    _C__5 = { value: 5 };
    _C__ = { value: (function () {
        })() };
    _C__2 = { value: (function () {
        })() };
    _C__4 = { value: (function () {
        })() };
    _C__6 = { value: (function () {
        })() };
    _C__7 = { value: (function () {
        })() };
    _C__8 = { value: (function () {
        })() };
    return C;
}());
console.log(_C__1);
