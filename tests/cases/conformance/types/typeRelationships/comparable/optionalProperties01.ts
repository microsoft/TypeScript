// @strictNullChecks: true
// @declaration: true
// @isolatedDeclarationFixedDiffReason: Sourcemap is more detailed

interface Foo {
  required1: string;
  required2: string;
  optional?: string;
}

const foo1 = { required1: "hello" } as Foo;
const foo2 = { required1: "hello", optional: "bar" } as Foo;
