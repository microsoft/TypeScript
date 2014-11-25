/// <reference path='fourslash.ts' />

//// /*{| "name": "1" |}

//// /*  {| "name": "2" |}

//// /*  *{| "name": "3" |}

//// /*  */{| "name": "4" |}

//// {| "name": "5" |}/*  */

/////* {| "name": "6" |}

goTo.marker("1");
verify.completionListIsEmpty();

goTo.marker("2");
verify.completionListIsEmpty();

goTo.marker("3");
verify.completionListIsEmpty();

goTo.marker("4");
verify.not.completionListIsEmpty();

goTo.marker("5");
verify.not.completionListIsEmpty();

goTo.marker("6");
verify.completionListIsEmpty();
