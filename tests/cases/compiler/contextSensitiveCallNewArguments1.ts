// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/62380

class Foo<T> {
  constructor(public inner: T) {}
}

class BarClass<T> {
  constructor(public accessor: (state: T) => boolean) {}
}

{
  class Container<C, F> {
    constructor(
      public ctx: C,
      public fooFactory: (ctx: C) => F,
      public bars: BarClass<F>[],
    ) {}
  }

  const container = new Container(42, (ctx) => new Foo({ answer: ctx }), [
    new BarClass((state) => true),
  ]);
}

{
  class Container<C, F> {
    constructor(
      public ctx: C,
      public fooFactory: (ctx: C) => F,
      public bar: BarClass<F>,
    ) {}
  }

  const containerWithoutAnnotation = new Container(
    42,
    (ctx) => new Foo({ answer: ctx }),
    new BarClass((state) => true),
  );

  const containerWithAnnotation = new Container(
    42,
    (ctx: number) => new Foo({ answer: ctx }),
    new BarClass((state) => true),
  );
}

{
  class Container<C, F> {
    constructor(
      public ctx: C,
      public fooFactory: (ctx: C) => F,
      public barFactory: () => BarClass<F>,
    ) {}
  }

  const container = new Container(
    42,
    (ctx) => new Foo({ answer: ctx }),
    () => new BarClass((state) => true),
  );
}

{
  class Container<C, F> {
    constructor(
      public ctx: C,
      public fooFactory: (ctx: C) => F,
      public barFactory: (dummy: never) => BarClass<F>,
    ) {}
  }

  const containerWithDummy = new Container(
    42,
    (ctx) => new Foo({ answer: ctx }),
    (dummy) => new BarClass((state) => true),
  );

  const containerWithWrongArity = new Container(
    42,
    (ctx) => new Foo({ answer: ctx }),
    () => new BarClass((state) => true),
  );
}
