///<reference path="fourslash.ts" />

//// /** @see {/*use1*/[|foooo|]} unknown reference*/
//// const a = ""

//// /** @see {/*use2*/[|@bar|]} invalid tag*/
//// const b = ""

//// /** @see /*use3*/[|foooo|] unknown reference without brace*/
//// const c = ""

//// /** @see /*use4*/[|@bar|] invalid tag without brace*/
//// const [|/*def1*/d|] = ""

//// /** @see {/*use5*/[|d@fff|]} partial reference */
//// const e = ""

//// /** @see /*use6*/[|@@@@@@|] total invalid tag*/
//// const f = ""

//// /** @see d@{/*use7*/[|fff|]} partial reference */
//// const g = ""

goTo.marker("use1");
verify.goToDefinition([]);

goTo.marker("use2");
verify.goToDefinition([]);

goTo.marker("use3");
verify.goToDefinition([]);

goTo.marker("use4");
verify.goToDefinition([]);

goTo.marker("use5");
verify.goToDefinitionIs("def1");

goTo.marker("use6");
verify.goToDefinition([]);

goTo.marker("use7");
verify.goToDefinition([]);