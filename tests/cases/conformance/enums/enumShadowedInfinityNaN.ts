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
