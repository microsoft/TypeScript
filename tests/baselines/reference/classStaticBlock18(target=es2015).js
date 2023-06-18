//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock18.ts] ////

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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
function foo() {
    var _a;
    return _a = class {
        },
        _a.foo = 1,
        (() => {
            var _a;
            const c = (_a = class {
                },
                __setFunctionName(_a, "c"),
                _a.bar = 2,
                (() => {
                    // do
                })(),
                _a);
        })(),
        _a;
}
