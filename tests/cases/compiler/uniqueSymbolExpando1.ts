// @strict: true
// @target: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/61214

const TestSymbol: unique symbol = Symbol();

const c = () => {
  return "Hello, world!";
};
c["testProp"] = ["Hello"];
c[TestSymbol] = ["Hello"];
