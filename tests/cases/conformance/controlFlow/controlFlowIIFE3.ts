// @strict: true
// @target: ESNext

class Foo {
  prop: number; // currently there's an error with strictPropertyInitialization

  constructor() {
    (async () => (this.prop = await 1))();
  }
}
