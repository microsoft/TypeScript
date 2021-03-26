//// [classStaticBlock18.ts]
function foo () {
  return class {
    static foo = 1;
    static {
      const c = class {
        static bar = 2;
        static {
          // do
        }
      }
    }
  }
}


//// [classStaticBlock18.js]
function foo() {
    var _a, _b, _c__, __;
    return _a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _a.foo = 1,
        __ = { value: (function () {
                var c_1 = (_b = /** @class */ (function () {
                        function class_2() {
                        }
                        return class_2;
                    }()),
                    _b.bar = 2,
                    _c__ = { value: (function () {
                            // do
                        })() },
                    _b);
            })() },
        _a;
}
