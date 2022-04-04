/// <reference path='fourslash.ts' />

////interface Test {
////    foo: string;
////    bar(a: string): void;
////}
////function f (_spec: any) {}
////function g (_spec: Test) {}
////[|f(() => {
////    g({});
////    g(
////    {});
////    g(
////      {}
////    );
////});|]

verify.codeFixAll({
    fixId: "fixMissingProperties",
    fixAllDescription: ts.Diagnostics.Add_all_missing_properties.message,
    newFileContent: `interface Test {
    foo: string;
    bar(a: string): void;
}
function f (_spec: any) {}
function g (_spec: Test) {}
f(() => {
    g({
        foo: "",
        bar: function(a: string): void {
            throw new Error("Function not implemented.");
        }
    });
    g(
    {
        foo: "",
        bar: function(a: string): void {
            throw new Error("Function not implemented.");
        }
    });
    g(
      {
          foo: "",
          bar: function(a: string): void {
              throw new Error("Function not implemented.");
          }
      }
    );
});`,
});
