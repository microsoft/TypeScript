type Constructor = new (...args: any[]) => {};

const Mixin1 = <C extends Constructor>(Base: C) => class extends Base { private _fooPrivate: {}; }

type FooConstructor = typeof Mixin1 extends (a: Constructor) => infer Cls ? Cls : never;
const Mixin2 = <C extends FooConstructor>(Base: C) => class extends Base {};

class C extends Mixin2(Mixin1(Object)) {}