/// <reference path="fourslash.ts"/>

////const genericObject = new GenericObject<
////  /*1*/{}
////>();
////const genericObject2 = new GenericObject2<
////  /*2*/{},
////  /*3*/{}
////>();

format.document();

goTo.marker("1");
verify.currentLineContentIs("    {}");
goTo.marker("2");
verify.currentLineContentIs("    {},");
goTo.marker("3");
verify.currentLineContentIs("    {}");