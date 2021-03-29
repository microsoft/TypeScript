///<reference path="fourslash.ts" />

// @Filename: foo.ts
//// interface [|/*def1*/Foo|] {
////     foo: string
//// }

//// namespace NS {
////     export interface [|/*def2*/Bar|] {
////         baz: Foo
////     }
//// }

//// /** {@link /*use1*/[|Foo|]} foooo*/
//// const a = ""

//// /** {@link NS./*use2*/[|Bar|]} ns.bar*/
//// const b = ""

//// /** {@link /*use3*/[|Foo|] f1}*/
//// const c = ""

//// /** {@link NS./*use4*/[|Bar|] ns.bar}*/
//// const [|/*def3*/d|] = ""

//// /** {@link /*use5*/[|d|] }dd*/
//// const e = ""

// Without lookahead, ambiguous between suffix type and link tag
//// /** @param x {@link /*use6*/[|Foo|]} */
//// function foo(x) { }

// @Filename: bar.ts
//// /** {@link /*use7*/[|Foo|] }dd*/
//// const f = ""

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

goTo.marker("use6");
verify.goToDefinitionIs("def1");

goTo.marker("use7");
verify.goToDefinitionIs("def1");
