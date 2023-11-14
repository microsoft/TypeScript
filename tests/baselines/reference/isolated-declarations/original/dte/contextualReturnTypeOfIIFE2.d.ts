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


/// [Declarations] ////



//// [contextualReturnTypeOfIIFE2.d.ts]
declare namespace app {
    function foo(): void;
}
