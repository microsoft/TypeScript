type Foo<T> = { items: T };

const Something = [];

type SomeFoo = Foo<Something>;

const x: Something = [];