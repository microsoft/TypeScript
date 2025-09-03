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
// https://github.com/microsoft/TypeScript/issues/54981
{
    let Infinity = {};
    let En;
    (function (En) {
        En[En["X"] = Infinity] = "X";
    })(En || (En = {}));
}
{
    let NaN = {};
    let En;
    (function (En) {
        En[En["X"] = NaN] = "X";
    })(En || (En = {}));
}
