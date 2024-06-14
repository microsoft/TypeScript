// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/43961

const createTransform = <I, O>(tr: (from: I) => O) => tr;

function withP2<P>(p: P) {
  const m = <I,>(from: I) => ({ ...from, ...p });
  return createTransform(m);
}

const addP2 = withP2({ foo: 1 });
const added2 = addP2({ bar: 2 });
