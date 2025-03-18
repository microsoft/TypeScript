//// [tests/cases/conformance/enums/enumShadowedInfinityNaN.ts] ////

//// [enumShadowedInfinityNaN.ts]
// https://github.com/microsoft/TypeScript/issues/54981

{
  let Infinity = {};
  enum En {
    X = Infinity
  }
}

{
  let NaN = {};
  enum En {
    X = NaN
  }
}


//// [enumShadowedInfinityNaN.js]
{
    let Infinity = {};
    let En;
    (function (En) {
        En["X"] = Infinity;
        if (typeof En.X !== "string") En[En.X] = "X";
    })(En || (En = {}));
}
{
    let NaN = {};
    let En;
    (function (En) {
        En["X"] = NaN;
        if (typeof En.X !== "string") En[En.X] = "X";
    })(En || (En = {}));
}
