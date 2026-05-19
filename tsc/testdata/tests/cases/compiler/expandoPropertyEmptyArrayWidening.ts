// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3976

const example: {
  (): void;
  items?: string[];
} = () => undefined;
example.items = [];

function f1() {}
f1.a = [];  // Implicit any error

const f2 = function() {};
f2.a = [];  // Implicit any error

const f3 = () => {};
f3.a = [];  // Implicit any error

const f4: { (): void, a: string[] } = () => {};
f4.a = [];

const f5: { (): void, a: string[] } = function() {};
f5.a = [];
