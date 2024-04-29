//// [tests/cases/conformance/es2017/useObjectValuesAndEntries5.ts] ////

//// [useObjectValuesAndEntries5.ts]
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


//// [useObjectValuesAndEntries5.js]
{
    let X;
    (function (X) {
        X[X["A"] = 0] = "A";
        X[X["B"] = 1] = "B";
    })(X || (X = {}));
    const xsV = Object.values(X);
    const xsE = Object.values(X);
    const o = { 5: 'test', 8: null };
    const v = Object.values(o);
    const e = Object.entries(o);
}
