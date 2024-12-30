// @strict: true
// @target: esnext, es2022, es2015, es5

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
