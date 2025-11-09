// @strict: true
// @lib: esnext
// @target: esnext
// @removeComments: false

export class Foo {
    client = {
      getThing: () => Promise.resolve('')
    }
  
    foo() {
      return (
        /* TODO: please refactor */ this.client
          .getThing() satisfies Promise<string>);
    }
  }