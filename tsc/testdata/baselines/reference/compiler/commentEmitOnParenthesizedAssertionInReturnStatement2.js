//// [tests/cases/compiler/commentEmitOnParenthesizedAssertionInReturnStatement2.ts] ////

//// [commentEmitOnParenthesizedAssertionInReturnStatement2.ts]
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

//// [commentEmitOnParenthesizedAssertionInReturnStatement2.js]
export class Foo {
    client = {
        getThing: () => Promise.resolve('')
    };
    foo() {
        return (
        /* TODO: please refactor */ this.client
            .getThing());
    }
}
