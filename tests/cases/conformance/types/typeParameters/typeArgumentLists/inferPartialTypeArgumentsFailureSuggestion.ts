type _ = number;

function f<T>(x: T extends number ? number : never) {}

f<_>(42);

f<[_][0]>(42);
