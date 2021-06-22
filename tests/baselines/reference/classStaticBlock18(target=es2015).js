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
    return _a = class {
        },
        _a.foo = 1,
        __ = { value: (() => {
                var _a, _c__;
                const c = (_a = class {
                    },
                    _a.bar = 2,
                    _c__ = { value: (() => {
                            // do
                        })() },
                    _a);
            })() },
        _a;
}
