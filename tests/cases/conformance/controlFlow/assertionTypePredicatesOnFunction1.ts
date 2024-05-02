// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/41232

interface LabelledFunction {
  label: string;
}

declare function assignLabel<T extends (...args: never) => unknown>(
  fn: T,
  label: string,
): asserts fn is T & LabelledFunction;

function a() {}
assignLabel(a, "a");
a.label;

const b = function () {};
assignLabel(b, "b");
b.label;

const c = () => {};
assignLabel(c, "c");
c.label;
