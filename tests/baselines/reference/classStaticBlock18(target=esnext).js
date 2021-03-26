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
    var _a;
    return _a = class {
            static {
                var _b;
                const c = (_b = class {
                        static {
                            // do
                        }
                    },
                    _b.bar = 2,
                    _b);
            }
        },
        _a.foo = 1,
        _a;
}
