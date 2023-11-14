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

/// [Errors] ////

contextualReturnTypeOfIIFE2.ts(2,12): error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.


==== contextualReturnTypeOfIIFE2.ts (1 errors) ====
    declare namespace app {
      function foo(): void;
               ~~~
!!! error TS9009: Assigning properties to functions without declaring them is not supported with --isolatedDeclarations. Add an explicit declaration for the properties assigned to this function.
    }
    
    app.foo.bar = (function () {
      const someFun = (arg: number) => {};
      return { someFun };
    })();
    
    app.foo.bar.someFun(1);
    