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

verify.baselineGetDefinitionAtPosition("use1", "use2", "use3");
