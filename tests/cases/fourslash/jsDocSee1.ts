///<reference path="fourslash.ts" />

//// interface [|/*def1*/Foo|] {
////     foo: string
//// }

//// namespace NS {
////     export interface [|/*def2*/Bar|] {
////         baz: Foo
////     }
//// }

//// /** @see {/*use1*/[|Foo|]} foooo*/
//// const a = ""

//// /** @see {NS./*use2*/[|Bar|]} ns.bar*/
//// const b = ""

//// /** @see /*use3*/[|Foo|] f1*/
//// const c = ""

//// /** @see NS./*use4*/[|Bar|] ns.bar*/
//// const [|/*def3*/d|] = ""

//// /** @see /*use5*/[|d|] dd*/
//// const e = ""

goTo.marker("use1");
verify.goToDefinitionIs("def1");

goTo.marker("use2");
verify.goToDefinitionIs("def2");

goTo.marker("use3");
verify.goToDefinitionIs("def1");

goTo.marker("use4");
verify.goToDefinitionIs("def2");

goTo.marker("use5");
verify.goToDefinitionIs("def3");