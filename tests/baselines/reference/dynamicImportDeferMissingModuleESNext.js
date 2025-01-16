//// [tests/cases/conformance/importDefer/dynamicImportDeferMissingModuleESNext.ts] ////

//// [b.ts]
import.defer("a").then(ns => {
  ns.foo();
});


//// [b.js]
import.defer("a").then(ns => {
    ns.foo();
});
