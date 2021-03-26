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
    return _a = class {
        },
        _a.foo = 1,
        __ = { value: (() => {
                const c = (_b = class {
                    },
                    _b.bar = 2,
                    _c__ = { value: (() => {
                            // do
                        })() },
                    _b);
            })() },
        _a;
}
