//// [tests/cases/compiler/yieldInForInInDownlevelGenerator.ts] ////

//// [yieldInForInInDownlevelGenerator.ts]
// https://github.com/microsoft/TypeScript/issues/49808
function* gen() {
  var obj: any = { foo: 1, bar: 2 };
  for (var key in obj) {
      yield key;
      delete obj.bar;
  }
}

//// [yieldInForInInDownlevelGenerator.js]
// https://github.com/microsoft/TypeScript/issues/49808
function* gen() {
    var obj = { foo: 1, bar: 2 };
    for (var key in obj) {
        yield key;
        delete obj.bar;
    }
}
