//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock29.ts] ////

//// [classStaticBlock29.ts]
// https://github.com/microsoft/TypeScript/issues/60879

export default class {
  static demo: number;
  static {
    this.demo = 1;
  }
}

export function makeCls() {
  return class {
    static demo: number;
    static {
      this.demo = 1;
    }
  };
}


//// [classStaticBlock29.js]
// https://github.com/microsoft/TypeScript/issues/60879
var _a;
class default_1 {
}
_a = default_1;
(() => {
    _a.demo = 1;
})();
export default default_1;
export function makeCls() {
    var _b;
    return _b = class {
        },
        (() => {
            _b.demo = 1;
        })(),
        _b;
}
