type A = | string;
type B =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" };

type C = [| 0 | 1, | "foo" | "bar"];
