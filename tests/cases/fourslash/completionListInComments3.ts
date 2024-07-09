/// <reference path='fourslash.ts' />

//// /*{| "name": "1" |}

//// /*  {| "name": "2" |}

//// /*  *{| "name": "3" |}

//// /*  */{| "name": "4" |}

//// {| "name": "5" |}/*  */

/////* {| "name": "6" |}

verify.completions(
    { marker: ["1", "2", "3", "6"], exact: undefined },
    { marker: ["4", "5"], exact: completion.globals },
);
