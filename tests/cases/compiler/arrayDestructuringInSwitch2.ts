type X = { kind: "a", a: [1] } | { kind: "b", a: [] }

function foo(x: X): 1 {
  const { kind, a } = x;
  switch (kind) {
    case "a":
      return a[0];
    case "b":
      return 1;
    default:
      const [n] = a;
      return a;
  }
}