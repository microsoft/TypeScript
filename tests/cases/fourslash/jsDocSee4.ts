///<reference path="fourslash.ts" />

//// class [|/*def1*/A|] {
////     foo () { }
//// }
//// declare const [|/*def2*/a|]: A;
//// /**
////  * @see {/*use1*/[|A|]#foo}
////  */
//// const t1 = 1
//// /**
////  * @see {/*use2*/[|a|].foo()}
////  */
//// const t2 = 1
//// /**
////  * @see {@link /*use3*/[|a|].foo()}
////  */
//// const t3 = 1

goTo.marker("use1");
verify.goToDefinitionIs(["def1"]);

goTo.marker("use2");
verify.goToDefinitionIs(["def2"]);

goTo.marker("use3");
verify.goToDefinitionIs([]);