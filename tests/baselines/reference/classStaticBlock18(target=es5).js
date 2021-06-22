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
    var _a, __;
    return _a = /** @class */ (function () {
            function class_1() {
            }
            return class_1;
        }()),
        _a.foo = 1,
        __ = { value: (function () {
                var _a, _c__;
                var c = (_a = /** @class */ (function () {
                        function class_2() {
                        }
                        return class_2;
                    }()),
                    _a.bar = 2,
                    _c__ = { value: (function () {
                            // do
                        })() },
                    _a);
            })() },
        _a;
}
