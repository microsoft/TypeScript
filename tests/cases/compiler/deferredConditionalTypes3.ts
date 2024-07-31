// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59450

declare function f(fun: <T>(t: T) => void): void;

f((t) => {
  type T = typeof t;

  type IsAny = T extends any ? true : false;
  type IsAnyArray = T[] extends any[] ? true : false;

  type IsString = T extends string ? true : false;
  type IsStringArray = T[] extends string[] ? true : false;
});

function g<T>(t: T) {
  type IsAny = T extends any ? true : false;
  type IsAnyArray = T[] extends any[] ? true : false;

  type IsString = T extends string ? true : false;
  type IsStringArray = T[] extends string[] ? true : false;
}

function h<Outer>() {
  f((t) => {
    type T = typeof t;

    type IsAny = T extends any ? true : false;
    type IsAnyArray = T[] extends any[] ? true : false;

    type IsString = T extends string ? true : false;
    type IsStringArray = T[] extends string[] ? true : false;
  });
}
