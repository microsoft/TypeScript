/// <reference path="fourslash.ts"/>

////if (true) try  {
////    // ...
////}   finally    {
////    // ...
////}

format.document();
verify.currentFileContentIs(
`if (true) try {
    // ...
} finally {
    // ...
}`);
