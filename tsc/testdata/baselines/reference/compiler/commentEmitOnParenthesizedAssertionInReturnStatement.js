//// [tests/cases/compiler/commentEmitOnParenthesizedAssertionInReturnStatement.ts] ////

//// [commentEmitOnParenthesizedAssertionInReturnStatement.ts]
export class Foo {
  client = {
    getThing: () => Promise.resolve('')
  }

  foo(): Promise<void> {
    return (
      /* TODO: Avoid using type assertions, please refactor. */ this.client
        .getThing() as unknown as Promise<void>
    );
  }
}


//// [commentEmitOnParenthesizedAssertionInReturnStatement.js]
export class Foo {
    client = {
        getThing: () => Promise.resolve('')
    };
    foo() {
        return (
        /* TODO: Avoid using type assertions, please refactor. */ this.client
            .getThing());
    }
}
