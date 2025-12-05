// @strict: true

type X = {
  y?: {
    z?: string;
  };
};
const x: X = {
  y: {},
};
// type guard
function isNotNull<A>(x: A): x is NonNullable<A> {
  return x !== null && x !== undefined;
}
// function which I want to call in the result of the expression
function title(str: string) {
  return str.length > 0 ? "Dear " + str : "Dear nobody";
}

isNotNull(x?.y?.z) ? title(x.y.z) : null; // should not error
