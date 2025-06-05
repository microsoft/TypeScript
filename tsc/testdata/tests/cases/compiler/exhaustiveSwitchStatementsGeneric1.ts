// @strict: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/986

interface A {
  type: "a";
}

interface B {
  type: "b";
}

interface Types {
  a: A;
  b: B;
}

export function exhaustiveSwitch<T extends keyof Types>(type: T): boolean {
  switch (type) {
    case "a":
      return true;
    case "b":
      return true;
  }
}
