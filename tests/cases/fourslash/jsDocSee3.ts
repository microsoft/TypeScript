///<reference path="fourslash.ts" />

//// interface [|/*def1*/A|] { }
//// namespace [|/*def2*/A|] { }
//// const [|/*def3*/A|] = 1;

//// /**
////  * @see {/*use1*/[|A|]}
////  */
//// const v = 2;


goTo.marker("use1");
verify.goToDefinitionIs(["def1", "def2", "def3"]);
