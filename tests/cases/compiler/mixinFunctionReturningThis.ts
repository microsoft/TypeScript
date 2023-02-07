// @declaration: true
class A {
  constructor(name: string) {}
}

type Constructor = new (...args: any[]) => {};
 
function MixB<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    getThis(): this {
      return this;
    }
  };
}

export default MixB(A);