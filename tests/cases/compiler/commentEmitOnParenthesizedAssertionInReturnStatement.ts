// @strict: true
// @lib: esnext
// @target: esnext
// @removeComments: false

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
