// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56352

function test1(arg: string | undefined) {
  if (!arg) throw new Error();

  switch (true) {
    case arg.toUpperCase() === "A":
      return "A";

    case arg.toUpperCase() === "B":
    case arg.toUpperCase() === "C":
    case arg.toUpperCase() === "D":
      return "B, C or D";
  }

  return "Not A, B, C or D";
}

function test2(arg: string | undefined) {
  if (!arg) throw new Error();

  switch (true) {
    case arg.toUpperCase() === "A":
    case arg.toUpperCase() === "B":
    case arg.toUpperCase() === "C":
      return "A, B or C";
    case arg.toUpperCase() === "D":
      return "D";
  }

  return "Not A, B, C or D";
}

function test3(
  foo:
    | { kind: "a"; prop: string }
    | { kind: "b"; prop: number }
    | { kind: "c"; prop: boolean },
  bar?: {
    type: "b";
  },
) {
  if (!bar) {
    return;
  }

  switch (foo.kind) {
    case "a":
      return;
    case bar.type:
    case "c":
      return;
  }
}