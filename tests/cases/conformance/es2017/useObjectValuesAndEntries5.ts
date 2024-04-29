// @target: es6
// @lib: es2017

{
enum X {A, B}

const xsV = Object.values(X);
const xsE = Object.values(X);

interface I {
  [x: number]: string | null;
}

const o: I = { 5: 'test', 8: null };
const v = Object.values(o);
const e = Object.entries(o);


}
