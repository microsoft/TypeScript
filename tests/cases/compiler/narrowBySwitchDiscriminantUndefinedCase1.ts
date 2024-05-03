// @strict: true
// @exactOptionalPropertyTypes: true, false
// @noUncheckedIndexedAccess: true, false
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57999

interface A {
  optionalProp?: "hello";
}

function func(arg: A) {
  const { optionalProp } = arg;

  switch (optionalProp) {
    case undefined:
      return undefined;
    case "hello":
      return "hello";
    default:
      assertUnreachable(optionalProp);
  }
}

function func2() {
  const optionalProp = ["hello" as const][Math.random()];

  switch (optionalProp) {
    case undefined:
      return undefined;
    case "hello":
      return "hello";
    default:
      assertUnreachable(optionalProp);
  }
}

function assertUnreachable(_: never): never {
  throw new Error("Unreachable path taken");
}
