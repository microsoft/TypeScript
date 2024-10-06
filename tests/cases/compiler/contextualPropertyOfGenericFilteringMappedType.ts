// @strict: true
// @noEmit: true

declare function f1<T extends object>(
  data: T,
  handlers: { [P in keyof T as P]: (value: T[P], prop: P) => void },
): void;

f1(
  {
    foo: 0,
    bar: "",
  },
  {
    foo: (value, key) => {},
    bar: (value, key) => {},
  },
);

declare function f2<T extends object>(
  data: T,
  handlers: { [P in keyof T as T[P] extends string ? P : never]: (value: T[P], prop: P) => void },
): void;

f2(
  {
    foo: 0,
    bar: "",
  },
  {
    bar: (value, key) => {},
  },
);

f2(
  {
    foo: 0,
    bar: "",
  },
  {
    foo: (value, key) => {
      // implicit `any`s
    },
  },
);
