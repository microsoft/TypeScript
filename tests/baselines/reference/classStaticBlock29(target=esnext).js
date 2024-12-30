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
export default class {
    static demo;
    static {
        this.demo = 1;
    }
}
export function makeCls() {
    return class {
        static demo;
        static {
            this.demo = 1;
        }
    };
}
