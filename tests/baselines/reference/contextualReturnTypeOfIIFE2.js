//// [tests/cases/compiler/contextualReturnTypeOfIIFE2.ts] ////

//// [contextualReturnTypeOfIIFE2.ts]
declare namespace app {
  function foo(): void;
}

app.foo.bar = (function () {
  const someFun = (arg: number) => {};
  return { someFun };
})();

app.foo.bar.someFun(1);


//// [contextualReturnTypeOfIIFE2.js]
app.foo.bar = (function () {
    var someFun = function (arg) { };
    return { someFun: someFun };
})();
app.foo.bar.someFun(1);
