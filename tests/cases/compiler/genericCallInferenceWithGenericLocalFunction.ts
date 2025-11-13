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

function withP3<P>(p: P) {
  const m =
    <I,>(from: I) =>
    <I2,>(from2: I2) => ({ ...from, ...from2, ...p });
  return createTransform(m);
}

const addP3 = withP3({ a: 1 });
const addedSome3 = addP3({ b: '' });
const added3 = addedSome3({ c: true });

const addP3_other = withP3({ foo: 'bar' });
const addedSome3_other = addP3_other({ qwerty: 123 });
const added3_other = addedSome3_other({ bazinga: true });
