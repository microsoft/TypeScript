struct C extends E { foo: string; } // error

struct D extends C { bar: string; }

struct E extends D { baz: number; }

/* struct C2<T> extends E2<T> { foo: T; } // error

struct D2<T> extends C2<T> { bar: T; }

struct E2<T> extends D2<T> { baz: T; }