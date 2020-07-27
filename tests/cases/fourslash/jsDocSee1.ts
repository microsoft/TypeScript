///<reference path="fourslash.ts" />

//// interface [|/*def1*/Foo|] {
////     foo: string
//// }

//// namespace NS {
////     export interface [| /*def2*/Bar|] {
////         baz: Foo
////     }
//// }

//// /** @see {/*use1*/[|Foo|]} foooo*/
//// const a = ""

//// /** @see {NS./*use2*/[|Bar|]} ns.bar*/
//// const b = ""

goTo.marker("use1");
verify.goToDefinitionIs("def1");

goTo.marker("use2");
verify.goToDefinitionIs("def2");
